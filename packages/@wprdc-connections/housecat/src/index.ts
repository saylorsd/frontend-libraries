import { MapPluginToolbox } from '@wprdc-types/map';
import { ProjectIndex } from '@wprdc-types/housecat';

export { HousecatAPI } from './api';

export type HousecatToolbox = MapPluginToolbox<string, ProjectIndex>;
