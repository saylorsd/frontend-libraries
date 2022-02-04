import React from 'react';
import { MapPluginConnection } from '@wprdc-types/connections';

import { Layer, LegendItem, LegendSection, Source } from '@wprdc-widgets/map';
import { useMapPlugin } from '@wprdc-connections/util';

import { ProjectKey, Resource } from '@wprdc-types/shared';
import { HousecatAPI } from './api';
import { ProjectIndex } from '@wprdc-types/housecat';

const VIZ_SOURCE_ID = '@viz';

interface AffordableHousingLayer extends Resource {}

/** Static layer use when showing affordable housing map */
export const housingProjectLayer: AffordableHousingLayer = {
  id: ProjectKey.Housecat,
  name: 'Affordable Housing',
  slug: ProjectKey.Housecat,
};

export const affordableHousingProjectMapConnection: MapPluginConnection<
  AffordableHousingLayer,
  ProjectIndex
> = {
  name: ProjectKey.Housecat,
  use: useMapPlugin,
  getSources(_, __, setSources) {
    HousecatAPI.requestPublicHousingProjectMap().then(
      (r) => {
        if (r.data) setSources([r.data.source]);
      },
      (err) => console.error(err)
    );
  },
  getLayers(_, __, setLayers) {
    HousecatAPI.requestPublicHousingProjectMap().then(
      (r) => {
        if (r.data) setLayers(r.data.layers);
      },
      (err) => console.error(err)
    );
  },
  getLegendItems(_, __, setLegendItems) {
    HousecatAPI.requestPublicHousingProjectMap().then(
      (r) => {
        if (r.data) setLegendItems(r.data.extras.legendItems);
      },
      (err) => console.error(err)
    );
  },
  getInteractiveLayerIDs() {
    return ['all-public-housing-projects/marker'];
  },
  parseMapEvent: (event) => {
    if (!!event && !!event.features) {
      const features = event.features.filter(
        (feature) =>
          !!feature &&
          !!feature.source &&
          !!feature.properties &&
          feature.source === VIZ_SOURCE_ID
      );
      return features.map(({ properties }) => properties as ProjectIndex);
    }
    return [];
  },
  makeFilter: () => {
    return ['==', 1, 1];
  },
  makeLegendSection: (setLegendSection, items) => {
    if (!!items && !!items.length)
      setLegendSection(
        <LegendSection title="Affordable Housing">
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
      : items.filter((item) => selection.has(item.id));
  },
  makeLayerPanelSection() {
    // todo: implement
  },
  makeHoverContent: () => {
    return null; // todo: implement
  },
  makeClickContent: () => {
    return null; // todo: implement
  },
};
