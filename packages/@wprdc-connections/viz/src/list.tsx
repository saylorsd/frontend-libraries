import * as React from 'react';

import { Item } from '@wprdc-components/util';

import { DataVizID, VariableBase } from '@wprdc-types/viz';
import { Described, ListConnection } from '@wprdc-types/shared';

function makeProfilesConnection<T extends Described>(
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

export const dataVizConnection: ListConnection<DataVizID> =
  makeProfilesConnection<DataVizID>('data-viz');
export const variableConnection: ListConnection<VariableBase> =
  makeProfilesConnection<VariableBase>('variable');
