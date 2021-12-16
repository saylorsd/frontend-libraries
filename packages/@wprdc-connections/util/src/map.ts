import { useState, useEffect, Key } from 'react';

import theme from './theme';

import { GeographyType } from '@wprdc-types/geo';
import {
  MapPluginToolbox,
  SourceProps,
  LayerProps,
  LegendItemProps,
  Expression,
  MapEvent,
  MapPluginHookArgs,
} from '@wprdc-types/map';

import { useProvider } from '@wprdc-components/provider';
import { Selection } from '@wprdc-types/shared';

export const CARTO_USER = 'wprdc';
export const MAPS_API_ENDPOINT = `https://${CARTO_USER}.carto.com/api/v1/map`;

export function useMapPlugin<T extends object, E>({
  connection,
  layerItems,
  layerSelection,
  selectedMapItem,
  context,
  setContext,
}: MapPluginHookArgs<T, E>): MapPluginToolbox<T, E> {
  const { colorScheme } = useProvider();
  const [sources, setSources] = useState<SourceProps[]>();
  const [layers, setLayers] = useState<LayerProps[]>();
  const [legendItems, setLegendItems] = useState<LegendItemProps[]>();
  const [legendSection, setLegendSection] = useState<JSX.Element>();
  const [mapSection, setMapSection] = useState<JSX.Element>();
  const [selection, setSelection] = useState<Selection>(
    layerSelection || (new Set() as Set<Key>),
  );
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [interactiveLayerIDs, setInteractiveLayerIDs] = useState<string[]>([]);
  // for filtering styled layers for interaction states
  const [hoveredFilter, setHoveredFilter] = useState<Expression>(
    clearLayerFilter(),
  );
  const [selectedFilter, setSelectedFilter] = useState<Expression>(
    clearLayerFilter(),
  );

  useEffect(() => {
    // When a selection is provided, it needs to overide the inside state
    if (!!layerSelection) setSelection(layerSelection);
  }, [layerSelection]);

  useEffect(() => {
    connection.makeMapSection(setMapSection, sources, layers);
  }, [sources, layers]);

  useEffect(() => {
    if (selectedMapItem)
      setSelectedFilter(connection.makeFilter(selectedMapItem));
    else setSelectedFilter(clearLayerFilter());
  }, [selectedMapItem]);

  useEffect(() => {
    // When the user hovers over the map or selects something, we only need to
    // update the layers as those interactions don't affect the deeper map state
    if (!!layerItems) {
      connection.getLayers(layerItems, selection, setLayers, {
        colorScheme,
        hoveredFilter,
        selectedFilter,
      });
    }
  }, [hoveredFilter, selectedFilter]);

  useEffect(() => {
    // When the available categories/layers change, or when one or many are
    // selected, we need to update the map data.
    if (!!layerItems) {
      // get mapbox source tiles
      connection.getSources(layerItems, selection, setSources, {
        ...context,
        colorScheme,
      });
      // get mapbox layers
      connection.getLayers(layerItems, selection, setLayers, {
        ...context,
        colorScheme,
        hoveredFilter,
        selectedFilter,
      });
      // get legend props
      connection.getLegendItems(layerItems, selection, setLegendItems, {
        colorScheme,
      });
      setInteractiveLayerIDs(
        connection.getInteractiveLayerIDs(layerItems, selection),
      );

      setSelectedItems(connection.getSelectedItems(layerItems, selection));
    }
  }, [layerItems, selection]);

  useEffect(() => {
    // When the legend items change, we need to update the section element.
    connection.makeLegendSection(setLegendSection, legendItems);
  }, [legendItems]);
  /**
   * Runs when a layer or category is selected in the map's menu.
   * @param selection
   */
  const handleLayerSelection = (selection: Selection) => {
    setSelection(selection);
  };

  /**
   * The map's mouse event handler will call this function as part of what
   * it does on hover events.
   * @param event
   */
  const handleHover = (event: MapEvent) => {
    const items: E[] = connection.parseMapEvent(event, {
      selectedLayers: selection,
    });
    setHoveredFilter(connection.makeFilter(items));
    return items;
  };

  /**
   * The map's mouse event handler will call this function as part of what
   * it does on click events.
   * @param event
   */
  const handleClick = (event: MapEvent) => {
    const clickedItems = connection.parseMapEvent(event);
    setSelectedFilter(connection.makeFilter(clickedItems));
    return clickedItems;
  };

  return {
    layerItems,
    sources,
    layers,
    legendItems,
    legendSection,
    interactiveLayerIDs,
    mapSection,
    selectedItems,
    handleLayerSelection,
    handleHover,
    handleClick,
  };
}

export function clearLayerFilter(): Expression {
  return ['==', 'geogid', 'w00t'];
}

type cartoResponse = {
  metadata: { tilejson: { vector: { tiles: string[] } } };
};

export function cartoInstantiationParams(id: string, sql: string) {
  return {
    layers: [
      {
        id,
        options: {
          sql,
        },
      },
    ],
  };
}

export function extractCartoTileUrls(data: cartoResponse): string[] {
  return data.metadata.tilejson.vector.tiles;
}

export function fetchCartoVectorSource(
  id: string,
  sql: string,
  apiKey?: string,
  type = 'vector',
  minzoom = 0,
  maxzoom = 22,
): PromiseLike<SourceProps> {
  const config = encodeURIComponent(
    JSON.stringify(cartoInstantiationParams(id, sql)),
  );

  const keyParam = apiKey ? `&api_key=${apiKey}` : '';

  return new Promise((resolve, reject) => {
    fetch(`${MAPS_API_ENDPOINT}?config=${config}${keyParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        (response) => response.json(),
        (error) => reject(error),
      )
      .then(
        (data) => {
          resolve({
            id,
            type,
            tiles: extractCartoTileUrls(data),
            minzoom,
            maxzoom,
          });
        },
        (error) => reject(error),
      );
  });
}

export function makeLayers(
  geogType: GeographyType,
  hoveredFilter?: Expression,
  selectedFilter?: Expression,
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
