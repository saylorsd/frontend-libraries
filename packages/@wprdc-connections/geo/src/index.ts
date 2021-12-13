import {
  SourceProps,
  LayerProps,
  LegendItemProps,
  MapPluginGetter,
  PluginContext,
  MapProps,
} from '@wprdc-types/geo';
import { MapEvent } from 'react-map-gl';
import { Expression } from 'mapbox-gl';

import { DataVizID } from '@wprdc-types/viz';
import { GeogLevel, GeogBrief, GeographyType } from '@wprdc-types/geo';
import { ProfilesMapProperties } from '@wprdc-types/profiles';
import {
  AssetType,
  AssetMapProperties,
} from '@wprdc-types/neighborhood-assets';

export { GeoAPI } from './api';
export * from './hooks';
// export { GeographyConnection } from "./GeographyConnection";
// export { GeographyTypeConnection } from "./GeographyTypeConnection";

export interface MapEventExtras {
  assets: AssetMapProperties[];
  profiles: any;
  menuGeog?: GeogBrief;
}

export interface ExtendedMapProps extends MapProps {
  profilesLayers?: DataVizID[];
  profilesLayersSelection?: Selection;
  selectedProfile?: ProfilesMapProperties;

  affordableHousingDatasets?: string[];

  assetTypes?: AssetType[];
  assetTypesSelection?: Selection;
  selectedAsset?: AssetMapProperties;
  defaultSelectedAssetLayers?: Selection;

  menuGeogTypes?: GeogLevel[];
  menuGeogTypesSelection?: Selection;
  selectedGeog?: GeogBrief;

  onHover?: (evt: MapEvent, extras?: MapEventExtras) => void;
  onClick?: (evt: MapEvent, extras?: MapEventExtras) => void;
}

export interface MapPluginConnection<T, E> {
  name: string;
  /** Generate MapBox sources based on state of interaction */
  getSources: MapPluginGetter<T, SourceProps[]>;

  /** Generate MapBox layers based on state of interaction */
  getLayers: MapPluginGetter<T, LayerProps[]>;

  /** Generate legend item data based on selected categories of type T */
  getLegendItems: MapPluginGetter<T, LegendItemProps[]>;

  /** Get array of Layer IDs that the user can interact with.*/
  getInteractiveLayerIDs: (items: T[], selected: Selection) => string[];

  /** Function to read MapEvent data and extract project items from it */
  parseMapEvent: (event: MapEvent, ctx?: PluginContext<T, E>) => E[];

  /** Make mapbox filter expression that limits map to item or items provided. */
  makeFilter: (item: E[] | E) => Expression;

  /** Generates a LegendSection populated with LegendItems corresponding to provided layers */
  makeLegendSection: (
    setLegendSection: (elem?: JSX.Element) => void,
    items?: LegendItemProps[],
  ) => void | null;

  /** Make element containing the react-map-gl Source and Layer for rendering. */
  makeMapSection: (
    setMapSection: (elem?: JSX.Element) => void,
    sources?: SourceProps[],
    layers?: LayerProps[],
  ) => void | null;

  getSelectedItems: (items: T[], selection: Selection) => T[];
}

// todo: move to components? make component peer dep?
//
// export const makeGeogComboBox = (geogType: GeographyType) =>
//   withConnection<GeogBrief>(new GeographyConnection(geogType));

//export const makeGeogSearchBox = (geogType: GeographyType) =>
//   withConnection<GeogBrief>(new GeographyConnection(geogType));

// const GeogSearchBox = withConnection<GeogBrief>(geographyConnection);

//export const GeogTypeSearchBox = withConnection<GeogLevel>(
//   geographyTypeConnection
// );
