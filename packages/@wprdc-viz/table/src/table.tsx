import * as React from 'react';
import './main.css';

import { Column } from 'react-table';
import { CensusTableRowRecord } from '@wprdc-types/viz';
import { formatCategory, formatPercent } from './util';
import {
  Downloaded,
  TableData,
  TableDatum,
  TableViz,
  TimePart,
  Variable,
  VizProps,
} from '@wprdc-types/viz';
import CensusTable from './CensusTable';

interface Props extends VizProps<TableViz, TableData> {}

export function Table({ dataViz, inPreview }: Props) {
  const { timeAxis, variables } = dataViz;
  if (!dataViz.data) return <div />;
  const columns: Column<CensusTableRowRecord>[] = [
    {
      accessor: 'label',
      id: 'category',
    },
    ...timeAxis.timeParts.map((timePart) => ({
      Header: timePart.name,
      accessor: timePart.slug,
    })),
  ];
  const data: CensusTableRowRecord[] = variables.map((variable, idx) => ({
    key: `${dataViz.slug}/${variable.slug}`,
    label: formatCategory(variable),
    ...timeAxis.timeParts.reduce(makeRowValuesReducer(dataViz, idx), {}),
    subRows: getPercentRows(dataViz, variable, idx),
    expanded: true,
  }));

  return <CensusTable columns={columns} data={data} inPreview={inPreview} />;
}

const makeRowValuesReducer =
  (table: Downloaded<TableViz, TableData>, idx: number) =>
  (acc: Record<string, any>, cur: TimePart) => ({
    ...acc,
    [cur.slug]: makeCellValue(table.data[idx][cur.slug], table.variables[idx]),
  });

function makeCellValue(d: TableDatum, v: Variable) {
  let displayValue = d.value;
  if (typeof d.value === 'number') {
    displayValue = d.value.toLocaleString(
      undefined,
      v.localeOptions || undefined,
    );
  }
  return (
    <>
      {displayValue}
      {typeof d.moe === 'number' && <MoE moe={d.moe} />}
    </>
  );
}

function MoE({ moe }: { moe: number }) {
  return (
    <span className="moe" title={`Margin of Error: ${moe.toFixed(2)}`}>
      <sup>&#177;</sup>
    </span>
  );
}

function getPercentRows(
  table: Downloaded<TableViz, TableData>,
  variable: Variable,
  idx: number,
) {
  return variable.denominators.map((denom) => ({
    key: `${table.slug}/${variable.slug}/${denom.slug}`,
    label: denom.percentLabel,
    ...table.timeAxis.timeParts.reduce(
      percentRowValuesReducer(table, idx, denom),
      {},
    ),
    className: 'subrow',
  }));
}

const percentRowValuesReducer =
  (table: Downloaded<TableViz, TableData>, idx: number, denom: Variable) =>
  (acc: Record<string, any>, cur: TimePart) => ({
    ...acc,
    [cur.slug]: getPercentValue(table, idx, denom, cur),
  });

function getPercentValue(
  table: Downloaded<TableViz, TableData>,
  idx: number,
  _: Variable,
  cur: TimePart,
) {
  const percentValue = table.data[idx][cur.slug].percent;
  return formatPercent(percentValue);
}
