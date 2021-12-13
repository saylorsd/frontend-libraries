import { PluginToolbox } from '@wprdc-types/geo';
import { ProjectIndex } from '@wprdc-types/housecat';

export { HousecatAPI } from './api';

export type HousecatToolbox = PluginToolbox<string, ProjectIndex>;
