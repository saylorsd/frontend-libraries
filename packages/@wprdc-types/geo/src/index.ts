export * from 'geojson';

import { MapboxGeoJSONFeature } from 'mapbox-gl';

export interface Geog extends GeogBase {
  hierarchy: GeogBrief[];
}

export interface GeogBrief extends GeogBase {}

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

export interface GeogLevel {
  name: string;
  id: GeographyType;
  tableName: string;
  cartoSql: string;
  description: string;
  defaultGeog: GeogBrief;
}

export interface GeogIdentifier {
  geogType: GeographyType;
  geogID: string;
}

export interface GeogBase extends GeogIdentifier {
  id: number;
  name: string;
  title: string;
  description?: string;
}

export type Feature = MapboxGeoJSONFeature;
