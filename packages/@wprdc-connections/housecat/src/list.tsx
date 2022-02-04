import * as React from 'react';

import { Item } from '@wprdc-components/util';

import { ListConnection } from '@wprdc-types/shared';
import {
  ListBoxOptions,
  ResourceOptionTemplateOptions,
} from '@wprdc-types/list-box';
import { ResourceOptionTemplate } from '@wprdc-components/list-box';

import { RiBuilding4Line } from 'react-icons/ri';
import { ProjectIndex } from '@wprdc-types/housecat';

export const affordableHousingProjectConnection: ListConnection<ProjectIndex> =
  {
    async load({ signal, cursor, filterText }) {
      const res = await fetch(
        cursor ||
          `https://api.profiles.wprdc.org/public-housing/project/?search=${filterText}&limit=10`,
        { signal }
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

/** style props */
export const defaultAffordableHousingListBoxProps: ListBoxOptions<
  ProjectIndex,
  ResourceOptionTemplateOptions<ProjectIndex>
> = {
  optionTemplate: ResourceOptionTemplate,
  optionTemplateOptions: {
    Icon: RiBuilding4Line,
    subtitleAccessor: 'propertyStreetAddress',
  },
};
