import * as React from 'react';

import { Item } from '@wprdc-components/util';

import { ListConnection, Resource } from '@wprdc-types/shared';
import { Indicator } from '@wprdc-types/profiles';
import {
  ListBoxOptions,
  ResourceOptionTemplateOptions,
} from '@wprdc-types/list-box';
import { ResourceOptionTemplate } from '@wprdc-components/list-box';

import { RiFolderChartLine } from 'react-icons/ri';

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

/** style props */
export const defaultIndicatorListBoxProps: ListBoxOptions<
  Indicator,
  ResourceOptionTemplateOptions<Indicator>
> = {
  optionTemplate: ResourceOptionTemplate,
  optionTemplateOptions: {
    Icon: RiFolderChartLine,
    subtitleAccessor: 'description',
  },
};
