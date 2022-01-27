import * as React from 'react';
import {
  SearchBox,
  ConnectedSearchBox,
} from '../packages/@wprdc-components/search-box';

import { ResourceOptionTemplate } from '../packages/@wprdc-components/list-box/';
import { dataVizConnection } from '../packages/@wprdc-connections/viz';
import { DataVizID } from '../packages/@wprdc-types/viz';
import { ResourceOptionTemplateOptions } from '../packages/@wprdc-types/list-box';
import { DataVizType } from '../packages/@wprdc-types/shared';

import {
  RiBarChart2Fill,
  RiMap2Fill,
  RiFontSize,
  RiTableLine,
} from 'react-icons/ri';

import { TiSortNumerically } from 'react-icons/ti';

export default {
  title: 'Components/SearchBox',
  component: SearchBox,
};

export const DataViz = () => (
  <div>
    <ConnectedSearchBox<DataVizID, ResourceOptionTemplateOptions<DataVizID>>
      connection={dataVizConnection}
      label={'Select an Data viz type'}
      listBoxProps={{
        optionTemplate: ResourceOptionTemplate,
        optionTemplateOptions: {
          // Icon: RiBarChart2Fill,
          getIcon: (item) => {
            switch (item.vizType) {
              case DataVizType.Chart:
                return RiBarChart2Fill;
              case DataVizType.MiniMap:
                return RiMap2Fill;
              case DataVizType.BigValue:
                return TiSortNumerically;
              case DataVizType.Sentence:
                return RiFontSize;
              case DataVizType.Table:
                return RiTableLine;
              default:
                return RiBarChart2Fill;
            }
          },
          subtitleField: 'vizType',
        },
      }}
    />
  </div>
);
