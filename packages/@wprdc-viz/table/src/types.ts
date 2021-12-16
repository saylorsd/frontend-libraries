/**
 *
 * Table types
 *
 **/
import React from 'react';
import { Column } from 'react-table';
import { TableData, TableViz, VizProps } from '../../types';

interface Props {
  columns: Column<RowRecord>[];
  data: RowRecord[];
}

export type TableProps = VizProps<TableViz, TableData, Props>;

export interface RowRecord extends Record<string, React.ReactNode> {
  key: React.Key;
  label?: React.ReactNode;
  children?: RowRecord[];
  className?: string;
}

export { Column };
