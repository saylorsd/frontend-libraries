import { TimeAxis } from '../time';
import { VizVariable } from '../variable';
import { SourceBase } from '../source';
import { DataVizType, Resource } from '@wprdc-types/shared';

//
// API response structure
// ----------------------
/** Minimal data on a data viz */
export interface DataVizID extends Resource<number> {
  vizType: DataVizType;
}

/** Shared fields across all data vizes */
export interface DataVizBase extends DataVizID {
  staticOptions?: Record<string, any>;
  timeAxis: TimeAxis;
  variables: VizVariable[];
  sources: SourceBase[];
}

/** Error details reported from backend */
export interface ErrorRecord {
  status: string;
  level: number;
  message?: string;
}

//
// Simple Table Data
// ================
/** Data provided to rows */
export interface RowRecord {
  variable: string;
  geog: string;
  time: string;
  value: number;
  moe?: number;
  percent?: number;
  denom?: number;
}

/** Collection of rows */
export type TabularData = RowRecord[];

//
// Structured Table
// ================
/** Represents data at point in time */
export interface StructuredTableDatum {
  value: number | string;
  moe?: number;
  percent?: number;
  denom?: number;
}

/**
 * Describes a row a data. Contains label of variable as well as a mapping of
 * time-axis slugs to the data for the variable at those time points.
 * */
export type StructuredTableRecord = Record<string, StructuredTableDatum> & {
  variable: string;
};

/** Collection of rows */
export type StructuredTableData = StructuredTableRecord[];
