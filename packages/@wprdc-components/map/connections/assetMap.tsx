import { MapPluginConnection } from '../types';
import { AssetMapProperties, AssetType } from '../../../types/communityAssets';
import { fetchCartoVectorSource } from '../utils';
import { ASSETS_LAYER_ID, ASSETS_SOURCE_ID } from '../settings';
import { ASSETS_CARTO_SQL } from '../../../settings';
import { makeAssetLayer, makeAssetLegendItems } from '../layers/assets';
import { LegendSection } from '../parts/LegendSection';
import { LegendItem } from '../parts/LegendItem';
import { Layer, Source } from 'react-map-gl';
import * as React from 'react';

export const assetMapConnection: MapPluginConnection<
  AssetType,
  AssetMapProperties
> = {
  name: 'assets',
  getSources: (_, __, setSources) => {
    fetchCartoVectorSource(ASSETS_SOURCE_ID, ASSETS_CARTO_SQL).then(
      (source) => setSources([source]),
      (err) => console.error('CARTO', err)
    );
  },
  getLayers: (items, selected, setLayers, options) => {
    const { colorScheme } = options || {};
    const categories =
      selected === 'all'
        ? items.map((item) => item.name)
        : Array.from(selected);
    setLayers([makeAssetLayer(categories, colorScheme)]);
  },
  getLegendItems: (items, selected, setLegendItems, options) => {
    const selectedTypes =
      selected === 'all'
        ? items.map((item) => item.name)
        : Array.from(selected);
    const { colorScheme } = options || {};
    const legendItems = makeAssetLegendItems(items, selectedTypes, colorScheme);
    setLegendItems(legendItems);
  },
  getInteractiveLayerIDs: (items, selected) => {
    const categories =
      selected === 'all'
        ? items.map((item) => item.name)
        : Array.from(selected);
    // for now asset layer just has one id
    if (!!categories.length) return [ASSETS_LAYER_ID];
    return [];
  },

  parseMapEvent: (event) => {
    if (!!event && !!event.features) {
      const features = event.features.filter(
        (feature) =>
          !!feature &&
          !!feature.source &&
          !!feature.properties &&
          feature.source === ASSETS_SOURCE_ID
      );
      return features.map(({ properties }) => properties as AssetMapProperties);
    }
    return [];
  },
  makeFilter: (item) => {
    if (Array.isArray(item)) return ['in', 'geoid', item.map((i) => i.id)];
    return ['==', 'id', item.id];
  },
  makeLegendSection: (setLegendSection, items) => {
    if (!!items && !!items.length)
      setLegendSection(
        <LegendSection title="Neighborhood Assets">
          {items.map((item) => (
            <LegendItem {...item} />
          ))}
        </LegendSection>
      );
    else setLegendSection();
  },
  makeMapSection: (setMapSection, sources, layers) => {
    if (!!sources && !!layers) {
      setMapSection(
        <>
          <Source {...sources[0]} key={sources[0].id} />
          <Layer {...layers[0]} key={layers[0].id} />
        </>
      );
    }
  },
  getSelectedItems(items, selection) {
    return selection === 'all'
      ? items
      : items.filter((item) => selection.has(item.name));
  },
};
