// when using profiles layers and menu controls, let the menu control what
// geography to use for profiles
// todo: have Geo connection do this
// const ctxGeogType =
//   !!menuToolbox.selectedItems && !!menuToolbox.selectedItems.length
//     ? menuToolbox.selectedItems[0]
//     : undefined;
//
// const ctxGeog: GeogBrief | undefined = !!ctxGeogType
//   ? ctxGeogType.defaultGeog
//   : undefined;
import React from 'react';
import { MapPluginConnection } from '@wprdc-types/map';
import { GeogLevel, GeogBrief, GeographyType } from '@wprdc-types/geo';
import { LayerProps } from '@wprdc-types/map';
import { Source, Layer } from '@wprdc-components/map';
import { RadioGroup, Radio } from '@wprdc-components/radio-group';
import {
  fetchCartoVectorSource,
  makeLayers,
  clearLayerFilter,
} from '@wprdc-connections/util';
import { useMapPlugin } from '@wprdc-connections/util';

export const menuLayerConnection: MapPluginConnection<GeogLevel, GeogBrief> = {
  name: 'menu',
  use: useMapPlugin,
  // todo: use available menu geog layers from profiles for this
  // todo: this will be a single selection
  getSources: (items, _, setSources) => {
    if (!!items) {
      const requests = items.map((item) =>
        fetchCartoVectorSource(`menu/${item.id}`, item.cartoSql),
      );
      Promise.all(requests).then((sources) => setSources(sources));
    }
  },
  getLayers: (items, selected, setLayers, options) => {
    const { hoveredFilter, selectedFilter } = options || {};
    const selectedItems =
      selected === 'all'
        ? items.map((i) => i.id)
        : (selected as Set<GeographyType>);

    setLayers(
      Array.from(selectedItems).reduce<LayerProps[]>(
        (result, item) => [
          ...result,
          ...makeLayers(item, hoveredFilter, selectedFilter),
        ],
        [],
      ),
    );
  },
  getLegendItems: () => {
    // for now, we don't show a legend item for the menu, so this will be a noop.
  },
  getInteractiveLayerIDs: (items, selected) => {
    const selectedItems =
      selected === 'all'
        ? items.map((i) => i.id)
        : (selected as Set<GeographyType>);
    // interact on just the fill layer for now if not forever.
    return Array.from(selectedItems).map((item) => `${item}/fill`);
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
            title: properties.title,
            geogType: properties.geogtype,
            geogID: properties.geogid,
            name: properties.name,
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
  makeLayerPanelSection(setLayerPanelSection, items, handleChange) {
    setLayerPanelSection(
      <div>
        <RadioGroup
          label="Select a menu layer"
          aria-label="select the geographic menu layer to display"
          onChange={handleChange}
        >
          {items.map((item) => (
            <Radio key={`menu/${item.id}`} value={`menu/${item.id}`}>
              {item.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>,
    );
  },
};
