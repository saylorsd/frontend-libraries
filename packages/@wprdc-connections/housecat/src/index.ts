import { MapPluginToolbox } from '@wprdc-types/connections';
import { ProjectIndex } from '@wprdc-types/housecat';
import { Resource } from '@wprdc-types/shared';

export * from './list';
export * from './hooks';
export * from './map';

export { HousecatAPI } from './api';

export type HousecatToolbox = MapPluginToolbox<Resource, ProjectIndex>;
