import { createAPI } from '@wprdc-connections/api';
import { ResponsePackage, Method } from '@wprdc-types/api';

import {
  Geog,
  GeogIdentifier,
  GeogBrief,
  GeographyType,
  GeogLevel,
} from '@wprdc-types/geo';

const HOST = 'https://api.profiles.wprdc.org';

export enum Endpoint {
  Geog = 'geo',
  GeogTypes = 'geo/geog-types',
}

const api = createAPI<Endpoint>(HOST);

function requestGeoLayers() {
  return api.callAndProcessEndpoint<GeogLevel[]>(
    Endpoint.GeogTypes,
    Method.GET,
  );
}

export function requestGeogDetails(
  geog: GeogIdentifier,
): Promise<ResponsePackage<Geog>> {
  const { geogType, geogID } = geog;
  return api.callAndProcessEndpoint<Geog>(Endpoint.Geog, Method.GET, {
    id: `${geogType}/${geogID}`,
    params: { details: true },
  });
}

export function requestGeogList(geogType: GeographyType) {
  return api.callAndProcessEndpoint<GeogBrief[]>(Endpoint.Geog, Method.GET, {
    id: geogType,
  });
}

export const GeoAPI = {
  requestGeogDetails,
  requestGeogList,
  requestGeoLayers,
};
