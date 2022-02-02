/**
 *
 * Profiles API
 *
 * Settings and functions that handle communicating with profiles backend.
 *
 */
import { createAPI } from '@wprdc-connections/api';
import { Method, ResponsePackage } from '@wprdc-types/api';

import { Downloaded, DataVizBase } from '@wprdc-types/viz';

const HOST = 'https://api.profiles.wprdc.org';

enum Endpoint {
  DataViz = 'data-viz',
}

const api = createAPI<Endpoint>(HOST);

function requestDataViz<T extends Downloaded<DataVizBase>>(
  dataVizSlug: string,
  geogSlug: string
): Promise<ResponsePackage<T>> {
  return api.callAndProcessEndpoint<T>(Endpoint.DataViz, Method.GET, {
    id: dataVizSlug,
    params: { geog: geogSlug },
  });
}

export const VizAPI = {
  requestDataViz,
};
