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
  Taxonomy = 'taxonomy',
  Domain = 'domain',
  // Subdomain = 'subdomain', // might not be necessary to use here
  Indicator = 'indicator', //   or here
}

const api = createAPI<Endpoint>(HOST);

function requestTaxonomy(slug?: string) {
  return api.callAndProcessListEndpoint<Domain>(Endpoint.Taxonomy, Method.GET, {
    id: slug,
  });
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
