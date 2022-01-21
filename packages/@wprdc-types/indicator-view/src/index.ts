/**
 *
 * IndicatorView types
 *
 **/
import { Indicator } from '@wprdc-types/profiles';
import { GeogBrief } from '@wprdc-types/geo';
import { DataVizBase } from '@wprdc-types/viz';

export interface IndicatorViewProps {
  indicator?: Indicator;
  geog?: GeogBrief;
  onGeogSelection?: (geog: GeogBrief) => any;
  card?: boolean;
  isLoading?: boolean;
  onExploreIndicator?: (indicator: Indicator) => unknown;
  onExploreDataViz?: (dataViz: DataVizBase) => unknown;
}

export interface ConnectedIndicatorViewProps
  extends Omit<IndicatorViewProps, 'indicator'> {
  indicatorSlug?: string;
}
