/**
 *
 * Profiles API
 *
 * Settings and functions that handle communicating with profiles backend.
 *
 */
import { createAPI } from '@wprdc-connections/api';
import { Method, ResponsePackage } from '@wprdc-types/api';

import { GeogBrief } from '@wprdc-types/geo';
import { Downloaded, DataVizBase } from '@wprdc-types/viz';

const HOST = 'https://api.profiles.wprdc.org';

enum Endpoint {
  DataViz = 'data-viz',
}

const api = createAPI<Endpoint>(HOST);

function requestDataViz<T extends Downloaded<DataVizBase>>(
  dataVizSlug: string,
  geog: GeogBrief
): Promise<ResponsePackage<T>> {
  const { geogType, geogID } = geog;
  return api.callAndProcessEndpoint<T>(Endpoint.DataViz, Method.GET, {
    id: dataVizSlug,
    params: { geogType: geogType, geogID: geogID },
  });
}

export const VizAPI = {
  requestDataViz,
};
