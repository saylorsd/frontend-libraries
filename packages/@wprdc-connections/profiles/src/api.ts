/**
 *
 * Profiles API
 *
 * Settings and functions that handle communicating with profiles backend.
 *
 */
import { createAPI } from '@wprdc-connections/api';
import { Method } from '@wprdc-types/api';

import { Domain, Indicator } from '@wprdc-types/profiles';

const HOST = 'https://api.profiles.wprdc.org';

enum Endpoint {
  Domain = 'domain',
  // Subdomain = 'subdomain', // might not be necessary to use here
  Indicator = 'indicator', //   or here
}

const api = createAPI<Endpoint>(HOST);

function requestTaxonomy() {
  return api.callAndProcessListEndpoint<Domain>(Endpoint.Domain, Method.GET);
}

function requestIndicator(slug: string) {
  return api.callAndProcessEndpoint<Indicator>(Endpoint.Indicator, Method.GET, {
    id: slug,
  });
}

export const ProfilesAPI = {
  requestTaxonomy,
  requestIndicator,
};
