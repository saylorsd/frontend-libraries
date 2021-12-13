import React, { Key, useEffect, useState } from 'react';
import { LayerProps, MapEvent, SourceProps } from 'react-map-gl';
import { Expression } from 'mapbox-gl';
import { clearLayerFilter } from './utils';
import {
  DataVizID,
  GeogBrief,
  GeogLevel,
  ProfilesMapProperties,
} from '../../types';
import { Selection } from '@react-types/shared';
import { AssetMapProperties, AssetType } from '../../types/communityAssets';
import { useProvider } from '../Provider';
import {
  ConnectedMapPlugin,
  LegendItemProps,
  MapPluginConnection,
  MapPluginGetterOptions,
  PluginToolbox,
} from './types';
import {
  assetMapConnection,
  menuLayerConnection,
  profilesConnection,
} from './connections';

export function useMapPlugin<T, E>(
  connection: MapPluginConnection<T, E>,
  layerItems?: T[],
  defaultSelectedLayers?: Selection,
  selectedChild?: E,
  ctx?: MapPluginGetterOptions
): PluginToolbox<T, E> {
  const { colorScheme } = useProvider();
  const [sources, setSources] = useState<SourceProps[]>();
  const [layers, setLayers] = useState<LayerProps[]>();
  const [legendItems, setLegendItems] = useState<LegendItemProps[]>();
  const [legendSection, setLegendSection] = useState<JSX.Element>();
  const [mapSection, setMapSection] = useState<JSX.Element>();
  const [selection, setSelection] = useState<Selection>(
    defaultSelectedLayers || (new Set() as Set<Key>)
  );
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [interactiveLayerIDs, setInteractiveLayerIDs] = useState<string[]>([]);
  // for filtering styled layers for interaction states
  const [hoveredFilter, setHoveredFilter] = React.useState<Expression>(
    clearLayerFilter()
  );
  const [selectedFilter, setSelectedFilter] = React.useState<Expression>(
    clearLayerFilter()
  );

  useEffect(() => {
    // When a selection is provided, it needs to overide the inside state
    if (!!defaultSelectedLayers) setSelection(defaultSelectedLayers);
  }, [defaultSelectedLayers]);

  useEffect(() => {
    connection.makeMapSection(setMapSection, sources, layers);
  }, [sources, layers]);

  useEffect(() => {
    if (selectedChild) setSelectedFilter(connection.makeFilter(selectedChild));
    else setSelectedFilter(clearLayerFilter());
  }, [selectedChild]);

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
        ...ctx,
        colorScheme,
      });
      // get mapbox layers
      connection.getLayers(layerItems, selection, setLayers, {
        ...ctx,
        colorScheme,
        hoveredFilter,
        selectedFilter,
      });
      // get legend props
      connection.getLegendItems(layerItems, selection, setLegendItems, {
        colorScheme,
      });
      setInteractiveLayerIDs(
        connection.getInteractiveLayerIDs(layerItems, selection)
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
    const items: E[] = connection.parseMapEvent(event, { selection });
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

export const useMenu: ConnectedMapPlugin<GeogLevel, GeogBrief> = (...args) =>
  useMapPlugin(menuLayerConnection, ...args);

export const useAssets: ConnectedMapPlugin<AssetType, AssetMapProperties> = (
  ...args
) => useMapPlugin(assetMapConnection, ...args);

export const useProfiles: ConnectedMapPlugin<DataVizID, ProfilesMapProperties> =
  (...args) => useMapPlugin(profilesConnection, ...args);
