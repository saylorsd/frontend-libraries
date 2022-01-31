/**
 *
 * Demographics Table
 *
 */

import * as React from 'react';
import './main.css';
import styles from './DemographicsTable.module.css';

import { Cell, Column, useExpanded, useTable } from 'react-table';
import {
  AxisItem,
  StyledTableProps,
  TableRowRecord,
  RowRecord,
  AxisOption,
} from '@wprdc-types/viz';
import classNames from 'classnames';
import { extractAndFormatLabel, extractAxes } from './util';

export const DemographicsTable: React.FC<StyledTableProps> = ({
  dataViz,
  inPreview,
}) => {
  const columnAxisKey: AxisOption = dataViz.options.columnAxis;
  const rowAxisKey: AxisOption = dataViz.options.rowAxis;

  function getSubRows(axisItem: AxisItem) {
    if (!!axisItem.denominators)
      return axisItem.denominators.map((denom) => ({
        key: `${dataViz.slug}/${axisItem.slug}/${denom.slug}`,
        label: denom.percentLabel,
        className: classNames(styles.row, styles.subrow),
        ...getCellValuesForRow(axisItem, columnAxis, true),
      }));
    return;
  }

  /**
   * Formats value and adds display of margin of error if available.
   */
  function makeCellValue<T extends AxisItem>(
    columnAxisItem: T,
    datum: RowRecord,
    showPercent?: boolean
  ): React.ReactNode {
    type ValueGetter = (d: RowRecord) => number | string | undefined;

    let getValue: ValueGetter = (datum) => datum.value;
    let numberFormatOptions: Intl.NumberFormatOptions | undefined =
      columnAxisItem.localeOptions || undefined;

    if (!!showPercent) {
      getValue = (datum) => datum.percent;
      numberFormatOptions = { style: 'percent', maximumFractionDigits: 0 };
    }

    let rawValue = getValue(datum);
    let displayValue: React.ReactNode = rawValue;
    if (typeof rawValue === 'number') {
      displayValue = rawValue.toLocaleString(undefined, numberFormatOptions);
    }

    // for now we only show the margin o' error for plain values
    const showMoe: boolean = !showPercent && typeof datum.moe === 'number';
    return (
      <>
        {displayValue}
        {showMoe && <MoE moe={datum.moe as number} />}
      </>
    );
  }

  /**
   * Returns a record mapping column axis slugs to an array of values
   * corresponding to the intersection of those column axis items and
   * the row axis item.
   */
  function getCellValuesForRow(
    rowAxisItem: AxisItem,
    columnAxis: AxisItem[],
    showPercent?: boolean
  ): Record<string, React.ReactNode> {
    let result: Record<string, React.ReactNode> = {};

    for (const columnAxisItem of columnAxis) {
      // find datum at intersection of columnAxisItem and rowAxisItem
      const datum = dataViz.data.find(
        (datum) =>
          datum[rowAxisKey] === rowAxisItem.slug &&
          datum[columnAxisKey] === columnAxisItem.slug
      );
      if (!!datum)
        result[columnAxisItem.slug] = makeCellValue(
          columnAxisItem,
          datum,
          showPercent
        );
      else result[columnAxisItem.slug] = <span className={styles.na}>N/A</span>;
    }
    return result;
  }

  const { columnAxis, rowAxis, viewAxis } = extractAxes(dataViz);
  const { showPercent } = dataViz.options;
  // todo: handle multiple items in viewAxis
  if (viewAxis.length > 1) console.warn('Multiple views not supported yet.');

  const columns: Column<TableRowRecord>[] = React.useMemo(
    () => [
      {
        id: 'category',
        accessor: 'label',
        Header: '',
      },
      ...columnAxis.map((axisPart) => ({
        accessor: axisPart.slug,
        Header: axisPart.name,
      })),
    ],
    [dataViz.slug, columnAxis]
  );

  // map items in row axis to row props
  const data: TableRowRecord[] = React.useMemo(
    () =>
      rowAxis.map((rowAxisItem) => ({
        // row metadata
        key: `${dataViz.slug}/${rowAxisItem.slug}`,
        label: extractAndFormatLabel(rowAxisItem),
        expanded: true,
        className: classNames(styles.row, styles.mainRow),

        // values for the row keyed by column axis item slug
        // per `accessor` in `columns
        ...getCellValuesForRow(rowAxisItem, columnAxis, false),

        // depending on props, and axis selections, generate subrows
        //  for the current row axis item
        subRows: !!showPercent ? getSubRows(rowAxisItem) : undefined,
      })),
    [dataViz.slug, rowAxis, columnAxis, showPercent]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns,
        data: data,
        initialState: {},
      },
      useExpanded
    );

  return (
    <div
      className={classNames(styles.container, {
        [styles.previewContainer]: inPreview,
      })}
    >
      <div className={styles.tableWrap}>
        <table className={styles.tableElem} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      className: getHeaderClassName(column),
                    })}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps({ className: row.original.className })}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps({
                        className: getCellClassName(cell),
                      })}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function getHeaderClassName(column: Column<TableRowRecord>) {
  if (column.id === 'expander') return styles.emptyHeader;
  if (column.id === 'category') return styles.categoryHeader;
  return classNames(styles.field, styles.fieldHeader);
}

function getCellClassName(cell: Cell<TableRowRecord>) {
  if (cell.column.id === 'expander') return styles.emptyCell;
  if (cell.column.id === 'category') return styles.categoryCell;
  return classNames(styles.field, styles.fieldCell);
}

function MoE({ moe }: { moe: number }) {
  return (
    <span className={styles.moe} title={`Margin of Error: ${moe.toFixed(2)}`}>
      <sup>&#177;</sup>
    </span>
  );
}

export default DemographicsTable;
