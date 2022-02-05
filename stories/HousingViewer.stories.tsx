import * as React from 'react';
import {
  SearchBox,
  ConnectedSearchBox,
} from '../packages/@wprdc-components/search-box';
import { ResourceOptionTemplateOptions } from '../packages/@wprdc-types/list-box';
import { ProjectIndex } from '@wprdc-types/housecat';
import {
  affordableHousingProjectConnection,
  defaultAffordableHousingListBoxProps,
} from '../packages/@wprdc-connections/housecat';

export default {
  title: 'Tools/Housing Projects Viewer',
  component: SearchBox,
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
      {!!project && (
        <div className="border-2 border-black p-4">
          <div>
            <span className="">{project.name} </span>
            {!!project.propertyId && (
              <span className="mono text-sm">({project.propertyId})</span>
            )}
          </div>
          <div className="text-sm">{project.propertyStreetAddress}</div>
        </div>
      )}
    </div>
  );
};
