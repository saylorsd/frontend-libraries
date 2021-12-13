import { GeogLevel } from '@wprdc-types/geo';
import { ListConnection } from '@wprdc-types/shared';
import { Item } from '@wprdc-components/util';

export class GeographyTypeConnection implements ListConnection<GeogLevel> {
  constructor() {}

  public load = async ({ signal }) => {
    const res = await fetch(`https://api.profiles.wprdc.org/geo/geog-types`, {
      signal,
    });
    const json = await res.json();

    return {
      items: json,
      cursor: undefined,
    };
  };
  public renderItem = (item) => <Item key={item.id}>{item.name}</Item>;
  public getKey = (item) => item.id.toString();
}
