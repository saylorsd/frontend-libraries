export * from 'geojson';

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

import { ColorScheme } from '@wprdc-types/shared';

export interface Geog extends GeogBase {
  hierarchy: GeogBrief[];
}

export interface GeogBrief extends GeogBase {}

export enum GeographyType {
  BlockGroup = 'blockGroup',
  Tract = 'tract',
  CountySubdivision = 'countySubdivision',
  SchoolDistrict = 'schoolDistrict',
  County = 'county',
  Neighborhood = 'neighborhood',
  ZCTA = 'zcta',
  State = 'state',
}

export interface GeogLevel {
  name: string;
  id: GeographyType;
  tableName: string;
  cartoSql: string;
  description: string;
  defaultGeog: GeogBrief;
}

export interface GeogIdentifier {
  geogType: GeographyType;
  geogID: string;
}

export interface GeogBase extends GeogIdentifier {
  id: number;
  name: string;
  title: string;
  description?: string;
}

//todo: pick which of these to move to @wprdc-types/geo

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

//todo: move specific references to projects up to connection level
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

  hideLegendTitle?: boolean;

  /**
   * Style variant for built-in layer panel.
   *
   * @default LayerPanelVariant.Inside
   */
  layerPanelVariant?: LayerPanelVariant;

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

  onHover?: (evt: MapEvent) => void;
  onClick?: (evt: MapEvent) => void;

  CustomHoverContents?: PopupContentComponent;
  CustomClickContents?: PopupContentComponent;

  mapboxApiAccessToken?: string;
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

export interface HoverPopupProps extends PopupProps {}

export interface ClickPopupProps extends PopupProps {}

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
  options?: MapPluginGetterOptions,
) => any;

export interface PluginContext<T, E> {
  layerItems?: T;
  selectedChild?: E;
  selection?: Selection;
  hoverFilter?: Expression;
  selectedFilter?: Expression;
}

export interface APIMapBoxResponse {
  source: SourceProps;
  layers: (LayerProps & { 'source-layer': string; id: string })[];
  extras: {
    legendItems: LegendItemProps[];
  };
}

export interface WithToolboxes {
  toolboxes: PluginToolbox<any, any>[];
}

// todo: come up with base props. extend elsewhere
export interface PluginToolbox<T, E> {
  name: string;
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
