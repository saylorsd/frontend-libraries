/*
 *
 * Variable types
 *
 */
import { Described } from '@wprdc-types/shared';
import { VariableSource } from './source';

export type Variable = VariableBase;

export interface VizVariable extends VariableBase {
  options: VizVariableOptions;
}

export interface VariableBase extends Described {
  shortName?: string;
  displayName: string;
  units?: string;
  unitNotes?: string;
  denominators: VariableBase[];
  depth: number;
  percentLabel: string;
  sources: VariableSource[];
  localeOptions?: Intl.NumberFormatOptions;
  resourcetype: VariableResourceType;
}

type VizVariableOptions = Record<string, any>;

export enum VariableResourceType {
  CKANVariable = 'CKANVariable',
  CensusVariable = 'CensusVariable',
}
