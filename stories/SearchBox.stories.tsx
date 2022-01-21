import * as React from 'react';
import {
  SearchBox,
  ConnectedSearchBox,
} from '../packages/@wprdc-components/search-box';

import { ResourceOptionTemplate } from '../packages/@wprdc-components/list-box/';
import { dataVizConnection } from '../packages/@wprdc-connections/viz/src';
import { DataVizID } from '../packages/@wprdc-types/viz/src';
import { ResourceOptionTemplateOptions } from '../packages/@wprdc-types/list-box/src';

import { RiBarChart2Fill as Icon } from 'react-icons/ri';

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
          Icon,
        },
      }}
    />
  </div>
);
