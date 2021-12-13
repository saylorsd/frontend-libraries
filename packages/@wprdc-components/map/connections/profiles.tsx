import { LegendItemProps, MapPluginConnection } from '../types';
import { PROFILES_SOURCE_ID } from '../settings';
import { LegendSection } from '../parts/LegendSection';
import { LegendItem } from '../parts/LegendItem';
import { Layer, LayerProps, Source, SourceProps } from 'react-map-gl';
import * as React from 'react';
import {
  DataVizID,
  DownloadedMiniMap,
  ProfilesMapProperties,
} from '../../../types';
import { ProfilesAPI } from '../../../api';
import { ResponsePackage } from '../../../api/api';

export const profilesConnection: MapPluginConnection<
  DataVizID,
  ProfilesMapProperties
> = {
  name: 'profiles',
  getSources(items, _, setSources, options) {
    const { geography } = options || {};

    // filter out highlight source and only take the data layer's source
    function filterResponse(response: ResponsePackage<DownloadedMiniMap>[]) {
      return response.reduce<SourceProps[]>((result, item) => {
        if (!!item.data) return [...result, ...item.data.options.sources];
        return result;
      }, []);
    }

    if (!!items && !!geography) {
      const requests = items.map((item) =>
        ProfilesAPI.requestDataViz<DownloadedMiniMap>(item.slug, geography)
      );

      // for each one, if there is response data, then put it in the list for setSources
      Promise.all(requests).then((response) =>
        setSources(filterResponse(response))
      );
    }
  },

  getLayers(items, selected, setLayers, options) {
    const { geography } = options || {};

    // filter out highlight source and only take the data layer's source
    function filterResponse(response: ResponsePackage<DownloadedMiniMap>[]) {
      return response.reduce<LayerProps[]>((result, item) => {
        if (!!item.data && (selected === 'all' || selected.has(item.data.slug)))
          return [...result, ...item.data.options.layers];
        return result;
      }, []);
    }

    if (!!items && !!geography) {
      const requests = items.map((item) =>
        ProfilesAPI.requestDataViz<DownloadedMiniMap>(item.slug, geography)
      );
      // for each one, if there is response data, then put it in the list for setSources
      Promise.all(requests).then((response) =>
        setLayers(filterResponse(response))
      );
    }
  },

  getLegendItems(items, selected, setLegendItems, options) {
    const { geography } = options || {};

    // filter out highlight source and only take the data layer's source
    function filterResponse(response: ResponsePackage<DownloadedMiniMap>[]) {
      return response.reduce<LegendItemProps[]>((result, item) => {
        if (!!item.data && (selected === 'all' || selected.has(item.data.slug)))
          return [...result, ...item.data.options.legends];
        return result;
      }, []);
    }

    if (!!items && !!geography) {
      const requests = items.map((item) =>
        ProfilesAPI.requestDataViz<DownloadedMiniMap>(item.slug, geography)
      );
      // for each one, if there is response data, then put it in the list for setSources
      Promise.all(requests).then((response) =>
        setLegendItems(filterResponse(response))
      );
    }
  },

  getInteractiveLayerIDs(items, selected) {
    const categories =
      selected === 'all'
        ? items.map((item) => item.name)
        : Array.from(selected);
    return categories.map((c) => c.toString());
  },

  parseMapEvent: (event) => {
    if (!!event && !!event.features) {
      const features = event.features.filter(
        (feature) =>
          !!feature &&
          !!feature.source &&
          !!feature.properties &&
          feature.source === PROFILES_SOURCE_ID
      );
      return features.map(
        ({ properties }) => properties as ProfilesMapProperties
      );
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
      : items.filter((item) => selection.has(item.id));
  },
};
