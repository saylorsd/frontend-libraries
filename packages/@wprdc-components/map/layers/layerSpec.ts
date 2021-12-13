import { GeographyType } from '../../../types';
import theme from '../theme';
import { LayerProps } from 'react-map-gl';
import { Expression } from 'mapbox-gl';
import { clearLayerFilter } from '../utils';

export function makeLayers(
  geogType: GeographyType,
  hoveredFilter?: Expression,
  selectedFilter?: Expression
): LayerProps[] {
  return [
    {
      id: `${geogType}/hover`,
      type: 'fill',
      source: `menu/${geogType}`,
      'source-layer': `menu/${geogType}`,
      layout: {},
      paint: {
        'fill-opacity': theme.polygons.fillOpacity.standard,
        'fill-color': theme.polygons.hoverColor,
      },
      filter: hoveredFilter || clearLayerFilter(),
    },
    {
      id: `${geogType}/selected`,
      type: 'fill',
      source: `menu/${geogType}`,
      'source-layer': `menu/${geogType}`,
      layout: {},
      paint: {
        'fill-opacity': theme.polygons.fillOpacity.standard,
        'fill-color': theme.polygons.selectedColor,
      },
      filter: selectedFilter || clearLayerFilter(),
    },
    {
      id: `${geogType}/borders`,
      type: 'line',
      source: `menu/${geogType}`,
      'source-layer': `menu/${geogType}`,
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': theme.polygons.lineWidth.dense,
        'line-opacity': theme.polygons.lineOpacity.standard,
        'line-color': theme.polygons.lineColor,
      },
    },
    {
      id: `${geogType}/fill`,
      type: 'fill',
      source: `menu/${geogType}`,
      'source-layer': `menu/${geogType}`,
      layout: {},
      paint: {
        'fill-opacity': theme.polygons.fillOpacity.selection,
        'fill-color': theme.polygons.fillColor,
      },
    },
  ];
}

export default makeLayers;
