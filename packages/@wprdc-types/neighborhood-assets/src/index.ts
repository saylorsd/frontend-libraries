import { Feature, MultiPoint } from 'geojson';

export interface AssetType {
  name: string;
  title: string;
  category?: any;
}

export interface AssetCategory {
  name: AssetCategoryName;
  title: string;
}

export type AssetID = number;

export interface Tag {
  name: string;
}

export interface LocationProperties {
  name: string;
  available_transportation: string;
  parent_location: any;
  fullAddress: string;
}

export type Location = Feature<MultiPoint, LocationProperties>;

export interface LocationDetails extends Location {
  streetAddress: string;
  unit: string;
  unitType: string;
  municipality: string;
  city: string;
  state: string;
  zip_code: string;
  parcel_id: string;
  residence: boolean;
  latitude: number;
  longitude: number;
  geom: any;
  geocodingProperties: string;
  iffyGeocoding: boolean;
}

export interface Organization {
  name: string;
  location?: string;
  email?: string;
  phone?: string;
}

export interface ProvidedService {
  name: string;
}

export interface TargetPopulation {
  name: string;
}

export interface DataSource {
  name: string;
  url: string;
}

export enum Localizability {
  Fixed = 'fixed',
  Mobile = 'mobile',
  Cyber = 'cyber',
}

export interface AssetBrief {
  id: AssetID;
  name: string;
  category: AssetCategory;
  asset_types: AssetType[];
  organization: Organization;
}

export interface Asset {
  id: AssetID;
  name: string;

  assetTypes: AssetType[];
  category: AssetCategory;
  organization: Organization;

  localizability: Localizability;
  location: Location;

  url?: string;
  email?: string;
  phone?: string;

  hoursOfOperation?: string;
  holidayHoursOfOperation?: string;
  childFriendly?: boolean;
  capacity?: number;
  accessibility?: boolean;
  internetAccess?: boolean;
  wifiNetwork?: string;
  wifiNotes?: string;
  computersAvailable?: boolean;
  openToPublic?: boolean;
  services?: ProvidedService[];
  hardToCountPopulations?: TargetPopulation[];

  doNotDisplay?: boolean;
  sensitive?: boolean;
  dataSource?: DataSource;

  dateEntered?: string;
  lastUpdated?: string;
}

/** Properties for map features of Asset items */
export interface AssetMapProperties {
  id: number;
  name: string;
  asset_type: string;
  asset_type_title: string;
  category: string;
  cartodb_id: number;
}

export type AssetCategoryName =
  | 'non-profit'
  | 'transportation'
  | 'business'
  | 'housing'
  | 'health'
  | 'food'
  | 'education/youth'
  | 'community-center'
  | 'civic';
