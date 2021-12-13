import { GeogBrief, GeographyType } from '@wprdc-types/geo';
import { ListConnection, AsyncListLoadOptions } from '@wprdc-types/shared';
import { Item } from '@wprdc-components/util';

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
