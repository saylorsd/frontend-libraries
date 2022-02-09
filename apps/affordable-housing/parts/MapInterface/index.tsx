/**
 *
 * MapInterface
 *
 */
import * as React from 'react';
import ReactMapGL, { ViewportProps } from 'react-map-gl';
import { neighborhoods, zipCodes } from './zoomLists';
import { MapMenuDropdown } from './MapMenuDropdown';
import { AddressSearch } from '../../components/AddressSearch';
import { TimeSlider } from '../../components/TimeSlider';

import styles from './MapInterface.module.css';

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
    <div className={styles.container}>
      <div className={styles.menuSection}>
        <fieldset className={styles.zoomControls}>
          <div className={styles.zoomLabel}>
            <legend className={styles.menuLegend}>Zoom Map To</legend>
          </div>
          <div className={styles.zoomSection}>
            <MapMenuDropdown<Option>
              id="zip-code-zoom"
              name="zip-code-zoom"
              items={zipCodes}
              placeholder="Zip code"
            />
          </div>
          <div className={styles.zoomSection}>
            <MapMenuDropdown<Option>
              items={neighborhoods}
              placeholder="Neighborhood"
            />
          </div>
        </fieldset>
        <div className={styles.searchBox}>
          <AddressSearch />
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
      <div className={styles.timeSection}></div>
    </div>
  );
}
