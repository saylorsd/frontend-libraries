import { AxisOption, DataVizBase, TabularData } from './common';
import { DataVizType } from '@wprdc-types/shared';
import * as React from 'react';

export { Column } from 'react-table';

export enum TableStyle {
  // basic style type
  Default = 'default',
  // structured demographic
  Demographics = 'demographics',
}

export interface TableViz extends DataVizBase {
  data?: TabularData;
  vizType: DataVizType.Table;
}

export interface TableOptions {
  tableStyle: TableStyle;
  showPercent: true;
  rowAxis: AxisOption;
  columnAxis: AxisOption;
  viewAxis: AxisOption;
}

export interface TableRowRecord extends Record<string, React.ReactNode> {
  key: React.Key;
  label?: React.ReactNode;
  children?: TableRowRecord[];
  className?: string;
}
