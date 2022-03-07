import React from 'react';
import { ConnectionProps, MapPluginConnection } from '@wprdc-types/connections';

import { Layer, LegendItem, LegendSection, Source } from '@wprdc-widgets/map';
import { useMapPlugin } from '@wprdc-connections/util';

import { ProjectKey, Resource } from '@wprdc-types/shared';
import { HousecatAPI } from './api';
import { ProjectIndexMapProperties } from '@wprdc-types/housecat';

import styles from './PopupContent.module.css';

interface AffordableHousingLayer extends Resource {}

/** Static layer use when showing affordable housing map */
export const housingProjectLayer: AffordableHousingLayer = {
  id: ProjectKey.Housecat,
  name: 'Affordable Housing',
  slug: ProjectKey.Housecat,
};

export const affordableHousingProjectMapConnection: MapPluginConnection<
  AffordableHousingLayer,
  ProjectIndexMapProperties
> = {
  name: ProjectKey.Housecat,
  use: useMapPlugin,
  getSources(_, __, setSources, options) {
    const { filterParams } = options || {};
    HousecatAPI.requestPublicHousingProjectMap(filterParams).then(
      (r) => {
        if (r.data) setSources([r.data.source]);
      },
      (err) => console.error(err)
    );
  },
  getLayers(_, __, setLayers, options) {
    const { filterParams } = options || {};
    HousecatAPI.requestPublicHousingProjectMap(filterParams).then(
      (r) => {
        if (r.data) setLayers(r.data.layers);
      },
      (err) => console.error(err)
    );
  },
  getLegendItems(_, __, setLegendItems, options) {
    const { filterParams } = options || {};
    HousecatAPI.requestPublicHousingProjectMap(filterParams).then(
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
          feature.source === 'all-public-housing-projects'
      );

      return features.map(
        ({ properties }) => properties as ProjectIndexMapProperties
      );
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
  makeHoverContent: (hoveredItems) => {
    if (!!hoveredItems && !!hoveredItems.length)
      return (
        <div className={styles.title}>
          {hoveredItems[0]['hud_property_name']}
        </div>
      );
    return null;
  },
  makeClickContent: (clickedItems) => {
    if (!!clickedItems && !!clickedItems.length)
      return (
        <div>
          <div className={styles.title}>
            {clickedItems[0]['hud_property_name']}
          </div>
          <div className={styles.details}>
            {clickedItems[0]['property_street_address']}
          </div>
        </div>
      );
    return null;
  },
};

export const defaultAffordableHousingProjectMapConnectionProps: ConnectionProps =
  {
    layerItems: [{ id: 'default', name: 'default', slug: 'default' }],
  };
