/*
 * Shared types
 */
import { ReactElement } from 'react';

import {
  AsyncListLoadFunction,
  AsyncListLoadOptions,
  AsyncListOptions,
} from '@react-stately/data';

import { Resource } from './resources';

export * from './resources';

export { AsyncListLoadOptions } from '@react-stately/data';
export { CollectionBase, Selection } from '@react-types/shared';

// todo: maybe move this to ../api
/** Backend API resource base properties. */

// todo: replace with enum
/** Slugs used to represent projects across connections */
export enum ProjectKey {
  Viz = 'viz',
  NeighborhoodAssets = 'neighborhood-assets',
  GeoMenu = 'geo-menu',
  Profiles = 'profiles',
  Housecat = 'housecat',
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
export interface ListConnection<T extends Resource, C = string>
  extends AsyncListOptions<T, C> {
  // T = Type, C = cursor, K = key
  load: AsyncListLoadFunction<T, C>;

  /** Function that describes how to render each item. */
  renderItem: (item: T) => JSX.Element;
}

/** A component that can except a connection */
export interface ListConnectableComponentProps<T extends Resource> {
  connection?: ListConnection<T>;
}

export type ListConnectableComponent<T extends Resource> = (
  props: ListConnectableComponentProps<T>,
) => ReactElement | null;

// add project strings for auto complete
