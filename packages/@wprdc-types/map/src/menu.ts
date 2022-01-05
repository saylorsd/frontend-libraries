import { LayerProps } from 'react-map-gl';

import { GeographyType } from '@wprdc-types/geo';

export enum LayerPanelVariant {
  Left = 'left',
  Right = 'right',
  Inside = 'inside',
  None = 'none',
}

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
