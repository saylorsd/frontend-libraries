import * as React from 'react';
import {
  SearchBox,
  ConnectedSearchBox,
} from '../packages/@wprdc-components/search-box';
import { dataVizConnection } from '../packages/@wprdc-connections/viz';
import { DataVizID } from '../packages/@wprdc-types/viz';
import { ResourceOptionTemplateOptions } from '../packages/@wprdc-types/list-box';
import { GeogBrief, GeographyType } from '@wprdc-types/geo';
import {
  defaultGeogListBoxProps,
  makeGeographyConnection,
} from '@wprdc-connections/geo';
import { defaultVizListBoxProps } from '@wprdc-connections/viz';
import { ProjectIndex } from '@wprdc-types/housecat';
import {
  affordableHousingProjectConnection,
  defaultAffordableHousingListBoxProps,
} from '../packages/@wprdc-connections/housecat';

export default {
  title: 'Components/SearchBox',
  component: SearchBox,
};

export const DataViz = () => {
  const [viz, setViz] = React.useState<DataVizID>();
  const [geog, setGeog] = React.useState<GeogBrief>();
  return (
    <div>
      <ConnectedSearchBox<GeogBrief>
        connection={makeGeographyConnection(GeographyType.County)}
        listBoxProps={defaultGeogListBoxProps}
        onSelection={setGeog}
      />
      <pre>{JSON.stringify(geog, null, 2)}</pre>
      <br />
      <br />
      <div>
        <ConnectedSearchBox<DataVizID, ResourceOptionTemplateOptions<DataVizID>>
          connection={dataVizConnection}
          listBoxProps={defaultVizListBoxProps}
          onSelection={setViz}
        />
      </div>
      <pre>{JSON.stringify(viz, null, 2)}</pre>
    </div>
  );
};

export const AffordableHousingProjects = () => {
  const [project, setProject] = React.useState<ProjectIndex>();

  return (
    <div>
      <ConnectedSearchBox<
        ProjectIndex,
        ResourceOptionTemplateOptions<ProjectIndex>
      >
        connection={affordableHousingProjectConnection}
        listBoxProps={defaultAffordableHousingListBoxProps}
        onSelection={setProject}
      />
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </div>
  );
};
