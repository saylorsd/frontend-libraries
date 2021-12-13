/*
 * Shared types
 */
import { AsyncListLoadFunction, AsyncListOptions } from '@react-stately/data';
export { AsyncListLoadOptions } from '@react-stately/data';

export { CollectionBase } from '@react-types/shared';

export interface Described<K extends string | number = string | number> {
  id: K;
  name: string;
  slug: string;
  description?: string;
}

export type SizeCategory = 'S' | 'M' | 'L';

export type Datum = number | string;

export enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
}

export enum DataVizType {
  Table = 'Table',
  Chart = 'Chart',
  MiniMap = 'MiniMap',
  Sentence = 'Sentence',
  BigValue = 'BigValue',
}

/** Connection that handles data that comes in a list format. */
export interface ListConnection<T, C = string> extends AsyncListOptions<T, C> {
  // T = Type, C = cursor, K = key
  load: AsyncListLoadFunction<T, C>;

  /** Function that describes how to render each item. */
  renderItem: (item: T) => JSX.Element;
}

/** A component taht can except a connection */
export interface ConnectableComponent<T> {
  connection: ListConnection<T>;
}
