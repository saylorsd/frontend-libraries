import * as React from 'react';

import { Item } from '@wprdc-components/util';

import { ListConnection, Resource } from '@wprdc-types/shared';
import { Indicator } from '@wprdc-types/profiles';

function makeProfilesConnection<T extends Resource>(
  itemType: string,
): ListConnection<T> {
  return {
    async load({ signal, cursor, filterText }) {
      const res = await fetch(
        cursor ||
          `https://api.profiles.wprdc.org/${itemType}/?search=${filterText}`,
        { signal },
      );
      const json = await res.json();

      return {
        items: json.results,
        cursor: json.next,
      };
    },
    renderItem: (item) => <Item key={item.id}>{item.name}</Item>,
    getKey: (item) => item.id.toString(),
  };
}

export const indicatorConnection: ListConnection<Indicator> =
  makeProfilesConnection<Indicator>('indicator');
