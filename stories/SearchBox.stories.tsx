import * as React from 'react';
import {
  SearchBox,
  ConnectedSearchBox,
} from '../packages/@wprdc-components/search-box';

import {
  assetsConnection,
  assetTypeConnection,
} from '../packages/@wprdc-connections/neighborhood-assets';

export default {
  title: 'Components/SearchBox',
  component: SearchBox,
};

export const Assets = () => (
  <div>
    <ConnectedSearchBox
      connection={assetsConnection}
      label={'Neighborhood Assets'}
    />
  </div>
);

export const AssetTypes = () => (
  <div>
    <ConnectedSearchBox
      connection={assetTypeConnection}
      label={'Select an Asset type'}
    />
  </div>
);
