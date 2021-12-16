/*
 * Shared types
 */
import { FC } from 'react';

import {
  AsyncListLoadFunction,
  AsyncListLoadOptions,
  AsyncListOptions,
} from '@react-stately/data';

export { AsyncListLoadOptions } from '@react-stately/data';
export { CollectionBase, Selection } from '@react-types/shared';

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
export interface ListConnection<T extends object, C = string>
  extends AsyncListOptions<T, C> {
  // T = Type, C = cursor, K = key
  load: AsyncListLoadFunction<T, C>;

  /** Function that describes how to render each item. */
  renderItem: (item: T) => JSX.Element;
}

/** A component that can except a connection */
export interface ListConnectableComponentProps<T extends object> {
  connection: ListConnection<T>;
}

export type ListConnectableComponent<T extends object> = FC<
  ListConnectableComponentProps<T>
>;

// add project strings for auto complete
export type ProjectKey =
  | 'viz'
  | 'neighborhood-assets'
  | 'geo'
  | 'profiles'
  | 'housecat'
  | string;
