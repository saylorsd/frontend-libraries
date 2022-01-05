import { createAPI } from '@wprdc-connections/api';

import { ResponsePackage, Method } from '@wprdc-types/api';
import { APIMapBoxResponse } from '@wprdc-types/connections';
import { ProjectIndexDetails } from '@wprdc-types/housecat';

const HOST = 'https://api.profiles.wprdc.org';

export enum Endpoint {
  PHProject = 'public-housing/project',
  PHProjectMap = 'public-housing/vector-map-test',
}

const api = createAPI<Endpoint>(HOST);

export function requestAffordableHousingProject(
  projectID: number,
): Promise<ResponsePackage<ProjectIndexDetails>> {
  return api.callAndProcessEndpoint<ProjectIndexDetails>(
    Endpoint.PHProject,
    Method.GET,
    {
      id: projectID,
    },
  );
}

export function requestPublicHousingProjectMap() {
  return api.callAndProcessEndpoint<APIMapBoxResponse>(
    Endpoint.PHProjectMap,
    Method.GET,
  );
}

export const HousecatAPI = {
  requestAffordableHousingProject,
  requestPublicHousingProjectMap,
};
