/**
 *
 * MapInterface
 *
 */
import * as React from 'react';
import ReactMapGL, { ViewportProps } from 'react-map-gl';
import { neighborhoods, zipCodes } from './zoomLists';

import styles from './MapInterface.module.css';
import { ConnectedSearchBox } from '@wprdc-components/search-box';
import { affordableHousingProjectConnection } from '@wprdc-connections/housecat';
import { Select } from '@wprdc-components/select';
import { Item } from '@wprdc-components/util';

interface Option {
  value: string;
  label: string;
}

interface Props {}

const API_KEY =
  'pk.eyJ1Ijoic3RldmVuZHNheWxvciIsImEiOiJja295ZmxndGEwbGxvMm5xdTc3M2MwZ2xkIn0' +
  '.WDBLMZYfh-ZGFjmwO82xvw';

export function MapInterface(props: Props) {
  const [viewport, setViewport] = React.useState<ViewportProps>({
    latitude: 40.442258956262904,
    longitude: -79.99870495366592,
    zoom: 10,
  });

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
        <ReactMapGL
          mapboxApiAccessToken={API_KEY}
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={(v: ViewportProps) => setViewport(v)}
        />
      </div>
    </div>
  );
}
