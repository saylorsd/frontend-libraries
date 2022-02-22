/**
 *
 * MapInterface
 *
 */
import * as React from 'react';
import { neighborhoods, zipCodes } from './zoomLists';

import styles from './MapInterface.module.css';
import { ConnectedSearchBox } from '@wprdc-components/search-box';
import {
  affordableHousingProjectConnection,
  affordableHousingProjectMapConnection,
  defaultAffordableHousingProjectMapConnectionProps,
} from '@wprdc-connections/housecat';
import { Select } from '@wprdc-components/select';
import { Item } from '@wprdc-components/util';
import { Map } from '@wprdc-widgets/map';
import { ProjectKey } from '@wprdc-types/shared';
import { FilterFormValues } from '../../types';

interface Option {
  value: string;
  label: string;
}

interface Props {
  filterParams?: FilterFormValues;
}

function makeConnectionHookArgs(filterParams?: FilterFormValues) {
  return {
    ...defaultAffordableHousingProjectMapConnectionProps,
    options: {
      ...defaultAffordableHousingProjectMapConnectionProps.options,
      filterParams,
    },
  };
}

export function MapInterface({ filterParams }: Props) {
  console.log({ filterParams });

  return (
    <div className={styles.wrapper}>
      <div className={styles.menuSection}>
        <fieldset className={styles.zoomControls}>
          <div className={styles.zoomLabel}>
            <legend className={styles.menuLegend}>Zoom Map To</legend>
          </div>
          <div className={styles.zoomSection}>
            <Select<Option>
              label="Zip code"
              aria-label="zoom to zip code"
              id="zip-code-zoom"
              name="zip-code-zoom"
              items={zipCodes}
              placeholder="Zip code"
            >
              {(item) => <Item key={item.value}>{item.label}</Item>}
            </Select>
          </div>
          <div className={styles.zoomSection}>
            <Select<Option>
              label="Neighborhood"
              aria-label="zoom to neighborhood"
              items={neighborhoods}
              placeholder="Neighborhood"
            >
              {(item) => <Item key={item.value}>{item.label}</Item>}
            </Select>
          </div>
        </fieldset>
        <div className={styles.searchBox}>
          <ConnectedSearchBox
            label="Project"
            connection={affordableHousingProjectConnection}
          />
        </div>
      </div>
      <div className={styles.mapSection}>
        <Map
          connections={[affordableHousingProjectMapConnection]}
          connectionHookArgs={{
            [ProjectKey.Housecat]: makeConnectionHookArgs(filterParams),
          }}
        />
      </div>
    </div>
  );
}
