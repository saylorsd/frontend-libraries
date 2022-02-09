import { Resource } from '@wprdc-types/shared';
import { DataVizID } from '@wprdc-types/viz';

interface IndicatorHierarchy {
  domain: Resource;
  subdomain: Resource;
}

export interface Indicator extends Resource {
  longDescription: string;
  fullDescription: string;
  limitations: string;
  importance: string;
  source: string;
  provenance: string;
  dataVizes: DataVizID[];
  hierarchies: IndicatorHierarchy[];
}

export interface Subdomain extends Resource {
  indicators: Indicator[];
}

export interface Domain extends Resource {
  subdomains: Subdomain[];
}

export type Taxonomy = Domain[];

type URLNavParamKeys =
  | 'geogType'
  | 'geogID'
  | 'domainSlug'
  | 'subdomainSlug'
  | 'indicatorSlug'
  | 'dataVizSlug';

export type URLNavParams = Record<URLNavParamKeys, string>;

export interface ProfilesMapProperties extends Resource {}
