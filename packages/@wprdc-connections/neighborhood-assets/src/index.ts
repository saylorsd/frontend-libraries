import { PluginToolbox } from '@wprdc-types/geo';
import { Asset, AssetType } from '@wprdc-types/neighborhood-assets';

export { AssetsAPI } from './api';
export * from './hooks';

export type NeighborhoodAssetsToolbox = PluginToolbox<AssetType, Asset>;
