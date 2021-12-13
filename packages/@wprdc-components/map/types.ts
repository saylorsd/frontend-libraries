import {
  LayerProps,
  MapEvent,
  PopupProps as RMGPopupProps,
  SourceProps,
  ViewportProps,
} from 'react-map-gl';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';
import * as React from 'react';

import { Expression, MapboxGeoJSONFeature } from 'mapbox-gl';

import {
  BackgroundColorValue,
  Selection,
  ViewStyleProps,
} from '@react-types/shared';

import * as GeoJSON from 'geojson';
import { AssetMapProperties, AssetType } from '../../types/communityAssets';
import {
  ColorScheme,
  DataVizID,
  GeogBrief,
  GeogLevel,
  GeographyType,
  ProfilesMapProperties,
} from '../../types';

export { LayerProps, MapEvent, RMGPopupProps, SourceProps, ViewportProps };

export type MapFormat = 'vector' | 'raster';
export type BasemapStyle = 'light' | 'dark' | 'streets';

export type Feature = MapboxGeoJSONFeature;

export interface ViewportOptions
  extends Omit<ViewportProps, 'width' | 'height'> {
  /** Width of viewport valid css height value string or number of pixels */
  width: string | number;

  /** Height of viewport valid css height value string or number of pixels */
  height: string | number;
}

export enum LayerPanelVariant {
  Left = 'left',
  Right = 'right',
  Inside = 'inside',
  None = 'none',
}

export interface MapProps extends InteractiveMapProps {
  /** Viewport to use on first render */
  defaultViewport?: Partial<ViewportOptions>;

  /**
   * ID of the mapbox style to use as a basemap.
   * @default 'light'
   **/
  basemapStyle?: BasemapStyle;

  /** mapbox source props */
  sources?: SourceProps[];

  /**  Mapbox layer props */
  layers?: LayerProps[];

  /** Overlay(s) for custom controls to display in the options slot (directly left of map controls) */
  optionsMenu?: React.ReactNode | React.ReactNodeArray;

  /** Item(s) to display in the legend for custom layers */
  legendItems?: LegendItemProps[];

  /**
   * When true, event handlers will not ignore `PointerEvents` that do not have any associated feature data.
   * @default false
   */
  useFeaturelessEvents?: boolean;

  /**
   * [react-map-gl](http://visgl.github.io/react-map-gl/docs) components.
   *
   * Primarily [`Source`s](http://visgl.github.io/react-map-gl/docs/api-reference/source)
   * and [`Layer`s](http://visgl.github.io/react-map-gl/docs/api-reference/layer)
   */
  children?: React.ReactNode | React.ReactNodeArray;

  // new stuff todo: clean up once we get things going
  /**
   * Color scheme defines what color palette and what basemap to start with.
   * @default 'light'
   */
  colorScheme?: ColorScheme;

  /**
   * The community asset types to show on the map.
   */
  assetTypes?: AssetType[];

  assetTypesSelection?: Selection;
  selectedAsset?: AssetMapProperties;

  /**
   * Style variant for built-in layer panel.
   *
   * @default LayerPanelVariant.Inside
   */
  layerPanelVariant?: LayerPanelVariant;

  defaultSelectedAssetLayers?: Selection;

  menuGeogTypes?: GeogLevel[];

  menuGeogTypesSelection?: Selection;
  selectedGeog?: GeogBrief;

  onHover?: (evt: MapEvent, extras?: MapEventExtras) => void;
  onClick?: (evt: MapEvent, extras?: MapEventExtras) => void;

  mapboxApiAccessToken?: string;

  hideLegendTitle?: boolean;

  cartoMaps?: CartoMap[];
  defaultSelectedCartoLayerID?: string | number;

  profilesLayers?: DataVizID[];
  profilesLayersSelection?: Selection;
  selectedProfile?: ProfilesMapProperties;

  CustomHoverContents?: PopupContentComponent;
  CustomClickContents?: PopupContentComponent;
}

export interface CartoMap {
  id: string;
  sql: string;
  label: string;
  layers: LayerProps[];
  legendItem: LegendItemProps;
  hoverContent?: (
    event: MapEvent,
    extra: MapEventExtras
  ) => JSX.Element | null | undefined;
}

export interface MultiLegendPropsPopupProps extends ViewStyleProps {
  title?: React.ReactNode;
  legends?: JSX.Element[];
  localeOptions?: Partial<Intl.NumberFormatOptions>;
}

export interface LegendProps extends Partial<WithToolboxes> {
  title?: React.ReactNode;
}

export interface LegendItemListProps {
  title?: string;
  items?: LegendItemProps[];
}

export type LegendItemProps =
  | CategoricalLegendItemProps
  | ColorScaleLegendItemProps;

export interface LegendItemBase {
  key?: React.Key;
  /** The text or component that describes the item */
  label: React.ReactNode;
}

export interface CategoricalLegendItemProps extends LegendItemBase {
  variant: 'categorical';
  /** Icon or image. if css color string provided, a circle of that color will be used */
  marker: React.ReactNode | BackgroundColorValue;
  /** Whether to make a simple color marker hollow (e.g. for polygon border colors */
  hollow?: boolean;
}

export interface ColorScaleLegendItemProps extends LegendItemBase {
  variant: 'scale';
  /** The array of steps that make up the scale */
  scale: Omit<CategoricalLegendItemProps, 'variant'>[];
  /** Locale settings */
  numberFormatOptions?: Partial<Intl.NumberFormatOptions>;
}

export interface PopupProps extends RMGPopupProps {}

export interface ExtendedPopupProps extends PopupProps {
  assets?: AssetMapProperties[];
  profiles?: any;
  menuGeog?: GeogBrief;
}

export interface HoverPopupProps extends ExtendedPopupProps {}

export interface ClickPopupProps extends HoverPopupProps {}

export interface MapEventExtras {
  assets: AssetMapProperties[];
  profiles: any;
  menuGeog?: GeogBrief;
}

export interface PopupSectionProps {
  /** Label to show above list. */
  label: string;
  /** Icon next to label. */
  icon?: (props: any) => JSX.Element;
}

export interface PopupContentProps<
  G extends GeoJSON.Geometry | null = GeoJSON.Geometry,
  P = GeoJSON.GeoJsonProperties
> {
  /** Event responsible for this popup. */
  event: MapEvent;
  /**
   * The features associated withe the event.
   * (shortcut - should be set `event.features`
   */
  features: GeoJSON.Feature<G, P>[] | unknown[];
  /**
   * The `properties` attached to the first feature from `event.features`.
   *  (shortcut - should be same as `event.features[0].properties]
   */
  primaryFeatureProps: P;
}

export type PopupContentComponent<
  P extends PopupContentProps = PopupContentProps
> = React.FC<P>;

export interface UserPopupContentProps {
  getLabel?: (eventData: PopupContentProps) => React.ReactNode;
  getDescription?: (eventData: PopupContentProps) => React.ReactNode;
  getIcon?: (eventData: PopupContentProps) => React.ReactNode;
}

export type ExtendedPopupContentProps = PopupContentProps &
  UserPopupContentProps;

export type ProjectKeys = 'w__assets' | 'w__profiles' | 'menuGeog';

export interface MenuLayerItem {
  slug: GeographyType;
  name: string;
  source: {
    type: 'vector' | 'raster';
    minzoom: number;
    maxzoom: number;
    source: string;
    sql: string;
  };
  layers: (LayerProps & { 'source-layer': string; id: string })[];
}

export interface MapPluginGetterOptions extends Record<string, any> {
  colorScheme?: ColorScheme;
  geography?: GeogBrief;
}

export type MapPluginGetter<T, R> = (
  items: T[],
  selected: Selection,
  callback: (r: R) => any,
  options?: MapPluginGetterOptions
) => any;

export interface PluginContext<T, E> {
  layerItems?: T;
  selectedChild?: E;
  selection?: Selection;
  hoverFilter?: Expression;
  selectedFilter?: Expression;
}

export interface MapPluginConnection<T, E> {
  name?: string;
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
    items?: LegendItemProps[]
  ) => void | null;

  /** Make element containing the react-map-gl Source and Layer for rendering. */
  makeMapSection: (
    setMapSection: (elem?: JSX.Element) => void,
    sources?: SourceProps[],
    layers?: LayerProps[]
  ) => void | null;

  getSelectedItems: (items: T[], selection: Selection) => T[];
}

export type ConnectedMapPlugin<T, E> = (
  items?: T[],
  defaultSelection?: Selection,
  selectedItem?: E,
  context?: MapPluginGetterOptions
) => PluginToolbox<T, E>;

export interface PluginToolbox<T, E> {
  layerItems?: T[];
  sources?: SourceProps[];
  layers?: LayerProps[];
  legendItems?: LegendItemProps[];
  interactiveLayerIDs: string[];
  mapSection?: JSX.Element | null;
  handleLayerSelection: (selection: Selection) => void;
  handleHover: (event: MapEvent) => E[];
  handleClick: (event: MapEvent) => E[];
  content?: JSX.Element;
  legendSection?: React.ReactNode;
  selectedItems?: T[];
}

export type AssetToolbox = PluginToolbox<AssetType, AssetMapProperties>;
export type MenuToolbox = PluginToolbox<GeogLevel, GeogBrief>;
export type ProfilesToolbox = PluginToolbox<DataVizID, ProfilesMapProperties>;

export interface WithToolboxes {
  assetToolbox: AssetToolbox;
  menuToolbox: MenuToolbox;
}
