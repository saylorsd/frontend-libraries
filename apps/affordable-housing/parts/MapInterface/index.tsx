/**
 *
 * MapInterface
 *
 */
import * as React from 'react';

import styles from './MapInterface.module.css';
import {
  affordableHousingProjectConnection,
  affordableHousingProjectMapConnection,
  ConnectedSearchBox,
  ConnectedSelect,
  defaultAffordableHousingProjectMapConnectionProps,
  GeogBrief,
  GeographyConnection,
  GeographyType,
  Map,
  ProjectIndex,
  ProjectKey,
} from '@wprdc/toolkit';
import { FilterFormValues } from '../../types';
import { MapRef } from 'react-map-gl';

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
  const mapRef = React.useRef<MapRef>(null);

  const handleZoomSelect = React.useCallback(
    ({ centroid }: { centroid?: [number, number] }) => {
      if (!!centroid) {
        mapRef.current?.flyTo({ center: centroid, zoom: 11, duration: 1000 });
      }
    },
    [],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.menuSection}>
        <fieldset className={styles.zoomControls}>
          <div className={styles.zoomLabel}>
            <legend className={styles.menuLegend}>Zoom Map To</legend>
          </div>
          <div className={styles.zoomSection}>
            <ConnectedSelect<GeogBrief>
              label="Zip code"
              aria-label="zoom to zip code"
              id="zip-code-zoom"
              connection={new GeographyConnection(GeographyType.ZCTA, 100)}
              onSelection={handleZoomSelect}
            />
          </div>
          <div className={styles.zoomSection}>
            <ConnectedSelect<GeogBrief>
              label="Neighborhood"
              aria-label="zoom to neighborhood"
              connection={
                new GeographyConnection(GeographyType.Neighborhood, 100)
              }
              onSelection={handleZoomSelect}
            />
          </div>
        </fieldset>
        <div className={styles.searchBox}>
          <ConnectedSearchBox<ProjectIndex>
            label="Project"
            connection={affordableHousingProjectConnection}
            onSelection={handleZoomSelect}
          />
        </div>
      </div>
      <div className={styles.mapSection}>
        <Map
          ref={mapRef}
          connections={[affordableHousingProjectMapConnection]}
          connectionHookArgs={{
            [ProjectKey.Housecat]: makeConnectionHookArgs(filterParams),
          }}
        />
      </div>
    </div>
  );
}
