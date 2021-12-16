import * as React from 'react';

import { Item } from '@wprdc-components/util';

import { GeographyType, GeogBrief, GeogLevel } from '@wprdc-types/geo';
import { ListConnection } from '@wprdc-types/shared';
import { AsyncListLoadOptions } from '@react-stately/data';

export class GeographyConnection implements ListConnection<GeogBrief> {
  geogType: GeographyType;

  constructor(geogType: GeographyType) {
    this.geogType = geogType;
  }

  public load = async ({
    signal,
    cursor,
    filterText,
  }: AsyncListLoadOptions<GeogBrief, string>) => {
    const res = await fetch(
      cursor ||
        `https://api.profiles.wprdc.org/geo/${this.geogType}/?search=${filterText}`,
      { signal },
    );
    const json = await res.json();
    return {
      items: json.results,
      cursor: json.next,
    };
  };

  public renderItem = (item: GeogBrief) => (
    <Item key={item.id}>{item.title}</Item>
  );
  public getKey = (item: GeogBrief) => item.id.toString();
}

export const geographyTypeConnection: ListConnection<GeogLevel> = {
  async load({ signal }) {
    const res = await fetch(`https://api.profiles.wprdc.org/geo/geog-types`, {
      signal,
    });
    const json = await res.json();

    return {
      items: json,
      cursor: undefined,
    };
  },
  renderItem: (item) => <Item key={item.id}>{item.name}</Item>,
  getKey: (item) => item.id.toString(),
};
