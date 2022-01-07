import React, { Key } from 'react';
import { MapPluginConnection } from '@wprdc-types/connections';
import { GeogBrief, GeogLevel, GeographyType } from '@wprdc-types/geo';
import { fetchCartoVectorSource, Layer, Source } from '@wprdc-components/map';
import { Radio, RadioGroup } from '@wprdc-components/radio-group';
import {
  clearLayerFilter,
  makeLayers,
  useMapPlugin,
} from '@wprdc-connections/util';
import { ProjectKey } from '@wprdc-types/shared';

//maps.v_neighborhood

export const menuLayerConnection: MapPluginConnection<GeogLevel, GeogBrief> = {
  name: ProjectKey.GeoMenu,
  use: useMapPlugin,
  getSources: (items, selection, setSources) => {
    // menu doesn't allow select many
    if (typeof selection === 'string')
      throw Error('Multiple select should not be available in map menu.');
    const selectedLayer = items.find((item) => selection.has(item.id));

    if (!!selectedLayer)
      setSources([
        {
          id: `menu/${selectedLayer.id}`,
          type: 'vector',
          url: `https://api.profiles.wprdc.org/tiles/maps.v_${selectedLayer.id.toLowerCase()}.json`,
        },
      ]);
  },
  getLayers: (items, selected, setLayers, options) => {
    if (typeof selected === 'string')
      throw Error('Multiple select should not be available in map menu.');
    const selectedLayer = items.find((item) => selected.has(item.id));
    const { hoveredFilter, selectedFilter } = options || {};
    // todo: build source based on selection.  or just put them all up at once tbh
    if (!!selectedLayer)
      setLayers(makeLayers(selectedLayer.id, hoveredFilter, selectedFilter));
  },
  getLegendItems: () => {
    // for now, we don't show a legend item for the menu, so this will be a noop.
  },
  getInteractiveLayerIDs: (items, selected) => {
    if (typeof selected === 'string')
      throw Error('Multiple select should not be available in map menu.');
    const selectedLayer = items.find((item) => selected.has(item.id));
    // todo: implement this property look at old veriosn in git history
    return [`${selectedLayer.id}/fill`];
  },
  parseMapEvent: (event) => {
    if (!!event && !!event.features) {
      const features = event.features.filter(
        (feature) =>
          !!feature &&
          !!feature.source &&
          typeof feature.source === 'string' &&
          !!feature.properties &&
          feature.source.substring(0, 4) === 'menu',
      );
      return features.map(
        ({ properties }) =>
          ({
            id: properties.id,
            name: properties.name,
            title: properties.display_name,
            slug: properties.slug,
            description: properties.description,
            geogType: properties.geog_type,
            geogID: properties.global_geoid,
          } as GeogBrief),
      );
    }
    return [];
  },
  makeFilter: (item) => {
    if (Array.isArray(item)) {
      if (!item.length) return clearLayerFilter();
      if (item.length === 1) return ['==', 'geogid', item[0].geogID];
      return ['in', 'geogid', item.map((i) => i.geogID)];
    }
    return ['==', 'geogid', item.geogID];
  },
  // the menu layer doesn't need to be indicated in the legend section for now
  makeLegendSection: (setLegendSection) => setLegendSection(),
  makeMapSection(setMapSection, sources, layers) {
    if (!!sources && !!layers) {
      setMapSection(
        <>
          {sources.map((source) => (
            <Source {...source} />
          ))}
          {layers.map((layer) => (
            <Layer {...layer} key={layer.id} />
          ))}
        </>,
      );
    } else setMapSection();
  },
  getSelectedItems(items, selection) {
    return selection === 'all'
      ? items
      : items.filter((item) => selection.has(item.id));
  },
  makeHoverContent: (hoveredItems, event) => {
    if (!!hoveredItems && !!hoveredItems.length)
      return <div className="text-xs">{hoveredItems[0].name}</div>;
  },
  makeClickContent: (clickedItems, event) => {
    return null;
  },
  makeLayerPanelSection(
    setLayerPanelSection,
    items,
    selectedItems,
    handleChange,
  ) {
    function _handleChange(val: string) {
      handleChange(new Set([val]));
    }

    if (items.length === 1) {
      setLayerPanelSection(null);
    } else {
      setLayerPanelSection(
        <div key={'geo-menu'}>
          <RadioGroup
            label="Select a menu layer"
            aria-label="select the geographic menu layer to display"
            onChange={_handleChange}
          >
            {items.map((item) => (
              <Radio key={`menu/${item.id}`} value={`menu/${item.id}`}>
                {item.name}
              </Radio>
            ))}
          </RadioGroup>
        </div>,
      );
    }
  },
};
