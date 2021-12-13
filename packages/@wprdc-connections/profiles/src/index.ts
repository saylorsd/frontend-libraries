import { PluginToolbox } from '@wprdc-types/geo';

import { DataVizID } from '@wprdc-types/viz';
import { ProfilesMapProperties } from '@wprdc-types/profiles';

export { ProfilesAPI } from './api';

export type ProfilesToolbox = PluginToolbox<DataVizID, ProfilesMapProperties>;
