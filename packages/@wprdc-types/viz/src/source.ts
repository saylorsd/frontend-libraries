/*
 *
 * Source types
 *
 */
import { Resource } from '@wprdc-types/shared';

export interface SourceBase extends Resource {
  infoLink: string;
}

export interface CensusSource extends SourceBase {
  dataset: string;
}

export interface CensusVariableSource extends CensusSource {
  formula: string;
}

export interface CKANSource extends SourceBase {
  packageId: string;
  resourceId: string;
}

export interface CKANVariableSource extends CKANSource {}

export type VariableSource = CensusVariableSource | CKANVariableSource;
