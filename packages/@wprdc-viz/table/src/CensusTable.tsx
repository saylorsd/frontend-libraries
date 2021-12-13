/**
 *
 * Table
 *
 * [ Two-dimensional grid of information ]
 *
 */

import * as React from 'react';

// todo: convert to module
import './CensusTable.css';

import { Cell, Column, useExpanded, useTable } from 'react-table';
import { RowRecord } from './types';
import classNames from 'classnames';

interface Props {
  columns: Column<RowRecord>[];
  data: RowRecord[];
  inPreview?: boolean;
}

export const CensusTable: React.FC<Props> = ({ columns, data, inPreview }) => {
  const allColumns = React.useMemo(() => columns, [columns]);
  const allData = React.useMemo(() => data, [data]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: allColumns,
        data: allData,
        initialState: {},
      },
      useExpanded
    );
  return (
    <div
      className={classNames('', {
        'rounded p-2': inPreview,
      })}
    >
      <div className="tableWrap">
        <table {...getTableProps()}>
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

function getHeaderClassName(column: Column<RowRecord>) {
  if (column.id === 'expander') return 'empty';
  if (column.id === 'category') return 'category';
  return 'field';
}

function getCellClassName(cell: Cell<RowRecord>) {
  if (cell.column.id === 'expander') return 'empty';
  if (cell.column.id === 'category') return 'category';
  return 'field';
}

export default CensusTable;
