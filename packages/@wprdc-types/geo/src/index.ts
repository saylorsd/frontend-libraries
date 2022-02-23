export * from 'geojson';

import { MapboxGeoJSONFeature } from 'mapbox-gl';

import { Resource } from '@wprdc-types/shared';

export interface Geog extends GeogBrief {
  hierarchy: GeogBrief[];
}

export interface GeogBrief extends GeogIdentifier, Resource {
  title: string;
  centroid?: [number, number];
}

export enum GeographyType {
  BlockGroup = 'blockGroup',
  Tract = 'tract',
  CountySubdivision = 'countySubdivision',
  SchoolDistrict = 'schoolDistrict',
  County = 'county',
  Neighborhood = 'neighborhood',
  ZCTA = 'zcta',
  State = 'state',
}

export interface GeogLevel extends Resource {
  name: string;
  id: GeographyType;
  description?: string;
}

export interface GeogIdentifier {
  geogType: GeographyType;
  geogID: string;
}

export type Feature = MapboxGeoJSONFeature;
