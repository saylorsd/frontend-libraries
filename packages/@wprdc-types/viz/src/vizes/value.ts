import { DataVizType } from '@wprdc-types/shared';

import { TabularData, DataVizBase } from './common';

export interface BigValueVizOptions {
  format: 'PLN' | 'FRN' | 'PCT' | 'BTH';
}

export interface BigValueViz extends DataVizBase {
  data?: TabularData;
  options?: BigValueVizOptions;
  vizType: DataVizType.BigValue;
}
