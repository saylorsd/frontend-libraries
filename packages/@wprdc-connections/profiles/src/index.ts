import { MapPluginToolbox } from '@wprdc-types/map';

import { DataVizID } from '@wprdc-types/viz';
import { ProfilesMapProperties } from '@wprdc-types/profiles';

export { ProfilesAPI } from './api';
export * from './list';

export type ProfilesToolbox = MapPluginToolbox<
  DataVizID,
  ProfilesMapProperties
>;
