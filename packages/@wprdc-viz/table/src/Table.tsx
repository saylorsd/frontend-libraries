import * as React from 'react';
import './main.css';
import './CensusTable.css';

import { Column } from 'react-table';
import { CensusTableRowRecord, DownloadedTableViz } from '@wprdc-types/viz';
import { extractAndFormatLabel, formatPercent } from './util';
import {
  Downloaded,
  StructuredTableData,
  StructuredTableDatum,
  TableViz,
  TimePart,
  Variable,
  TableVizProps,
} from '@wprdc-types/viz';
import CensusTable from './CensusTable';

/**
 * Renders a table of data.
 * @param dataViz
 * @param inPreview
 * @constructor
 */
export function Table({ dataViz, inPreview }: TableVizProps) {
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
  // map variables to row props
  const data: CensusTableRowRecord[] = variables.map((variable, idx) => ({
    key: `${dataViz.slug}/${variable.slug}`,
    label: extractAndFormatLabel(variable),
    ...timeAxis.timeParts.reduce(makeRowValuesReducer(dataViz, idx), {}),
    subRows: getPercentRows(dataViz, variable, idx),
    expanded: true,
  }));

  // todo: select render component based on type
  return <CensusTable columns={columns} data={data} inPreview={inPreview} />;
}

/**
 * Closure that returns a reducer function used to reduce a list of time parts
 *  into a map of time parts, by slug, to cell values
 */
const makeRowValuesReducer =
  (table: DownloadedTableViz, idx: number) =>
  (acc: Record<string, any>, cur: TimePart) => ({
    ...acc,
    [cur.slug]: makeCellValue(table.data[idx][cur.slug], table.variables[idx]),
  });

/**
 * Creates and returns a react node to render a table cell's contents based on
 * the datum and variable provided.
 * @param d
 * @param v
 */
function makeCellValue(d: StructuredTableDatum, v: Variable) {
  let displayValue = d.value;
  if (typeof d.value === 'number') {
    displayValue = d.value.toLocaleString(
      undefined,
      v.localeOptions || undefined
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
  table: Downloaded<TableViz, StructuredTableData>,
  variable: Variable,
  idx: number
) {
  return variable.denominators.map((denom) => ({
    key: `${table.slug}/${variable.slug}/${denom.slug}`,
    label: denom.percentLabel,
    ...table.timeAxis.timeParts.reduce(
      percentRowValuesReducer(table, idx, denom),
      {}
    ),
    className: 'subrow',
  }));
}

const percentRowValuesReducer =
  (
    table: Downloaded<TableViz, StructuredTableData>,
    idx: number,
    denom: Variable
  ) =>
  (acc: Record<string, any>, cur: TimePart) => ({
    ...acc,
    [cur.slug]: getPercentValue(table, idx, denom, cur),
  });

function getPercentValue(
  table: Downloaded<TableViz, StructuredTableData>,
  idx: number,
  _: Variable,
  cur: TimePart
) {
  const percentValue = table.data[idx][cur.slug].percent;
  return formatPercent(percentValue);
}
