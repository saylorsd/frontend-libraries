import { DataVizType } from '@wprdc-types/shared';

import { TabularData, DataVizBase } from './common';

export interface SentenceViz extends DataVizBase {
  data?: TabularData;
  vizType: DataVizType.Sentence;
}
