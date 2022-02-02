import { DataVizBase, ErrorRecord, TabularData } from './common';
import { TableOptions, TableViz } from './table';
import { MiniMapData, MiniMapOptions, MiniMapViz } from './mini-map';
import { SentenceViz } from './sentence';
import { BigValueViz } from './value';
import { GeogBrief } from '@wprdc-types/geo';
import * as React from 'react';
import { ColorScheme } from '@wprdc-types/shared';
import { ChartViz } from './chart';

export * from './common';

export * from './chart';
export * from './mini-map';
export * from './sentence';
export * from './table';
export * from './value';

/** DataViz type T with `data` required */
export type Downloaded<
  T extends DataVizBase,
  D = DataVizData,
  O = Record<string, any>,
> = T & {
  data: D;
  options: O;
  error: ErrorRecord;
  warnings: ErrorRecord;
  geogs: GeogBrief[];
};

/** Available data visualizations */
export type DataVisualization =
  | TableViz
  | MiniMapViz
  | SentenceViz
  | BigValueViz;

/** Available viz data formats */
export type DataVizData = TabularData | MiniMapData;

//
// Viz responses with data and options
//
export type DownloadedTableViz = Downloaded<
  TableViz,
  TabularData,
  TableOptions
>;

export type DownloadedViz = Downloaded<DataVizBase, DataVizData>;

export type DownloadedMiniMapViz = Downloaded<MiniMapViz, null, MiniMapOptions>;

export type DownloadedChartViz = Downloaded<ChartViz, TabularData>;

export type DownloadedSentenceViz = Downloaded<SentenceViz>;

export type DownloadedValueViz = Downloaded<BigValueViz>;

export type BaseVizProps = VizProps<DownloadedViz>;
export type TableVizProps = VizProps<DownloadedTableViz>;
export type MiniMapVizProps = VizProps<DownloadedMiniMapViz>;
export type ChartVizProps = VizProps<DownloadedChartViz>;
export type SentenceVizProps = VizProps<DownloadedSentenceViz>;
export type ValueVizProps = VizProps<DownloadedValueViz>;

export type DataVizProps =
  | TableVizProps
  | MiniMapVizProps
  | ChartVizProps
  | SentenceVizProps
  | ValueVizProps
  | BaseVizProps;
//
// Props
// -----
export type VizProps<
  T extends DownloadedViz,
  P extends Record<string, any> = {},
> = React.PropsWithChildren<
  {
    dataViz: T;
    geog: GeogBrief;
    colorScheme?: ColorScheme;
    vizHeight?: number;
    vizWidth?: number;
    error?: string;
    inPreview?: boolean;
  } & P
>;

export interface VizWrapperProps {
  isLoading: boolean;
  showGeog?: boolean;
  error?: string;
  geog?: GeogBrief;
  colorScheme: ColorScheme;
  menu?: JSX.Element;
  dataViz?: Downloaded<DataVizBase>;
  Visualization?: React.FC<DataVizProps>;
  breadcrumbs?: JSX.Element[];
  onExplore?: (dataViz: DataVizBase) => unknown;
  onBreadcrumbClick?: (path: React.ReactText) => void;
  onGeogSelection?: (geog: GeogBrief) => void;
}

export interface AxisItem {
  name: string;
  slug: string;
  shortName?: string;
  depth?: number;
  localeOptions?: Intl.NumberFormatOptions;
  denominators?: AxisItem[];
  percentLabel?: string;
}

export interface StyledTableProps extends TableVizProps {}
