import { Described } from '@wprdc-types/shared';
import { DataVizID } from '@wprdc-types/viz';

interface IndicatorHierarchy {
  domain: Described;
  subdomain: Described;
}

export interface Indicator extends Described {
  longDescription: string;
  limitations: string;
  importance: string;
  source: string;
  provenance: string;
  dataVizes: DataVizID[];
  hierarchies: IndicatorHierarchy[];
}

export interface Subdomain extends Described {
  indicators: Indicator[];
}

export interface Domain extends Described {
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

export interface ProfilesMapProperties extends Described {}
