import { DataVizBase, StructuredTableData } from './common';
import { DataVizType } from '@wprdc-types/shared';
import { Column } from 'react-table';
import * as React from 'react';

export { Column } from 'react-table';

export enum TableStyle {
  // basic style type
  Default = 'default',
  // structured demographic
  Demographics = 'demographics',
}

export interface TableViz extends DataVizBase {
  data?: StructuredTableData;
  vizType: DataVizType.Table;
}

export interface TableOptions {
  tableStyle: TableStyle;
  transpose: boolean;
  showPercent: boolean;
  columns: Column[];
}

interface CensusTableProps {
  columns: Column<CensusTableRowRecord>[];
  data: CensusTableRowRecord[];
}

export interface CensusTableRowRecord extends Record<string, React.ReactNode> {
  key: React.Key;
  label?: React.ReactNode;
  children?: CensusTableRowRecord[];
  className?: string;
}
