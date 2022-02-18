/**
 *
 * MapPage
 *
 */
import * as React from 'react';
import { MapFilterForm } from '../parts/MapFilterForm';
import { MapInterface } from '../parts/MapInterface';
import { DataDashboard } from '../parts/DataDashboard';

import styles from '../styles/Map.module.css';
import { Item, Tabs } from '@wprdc/toolkit';

interface Props {}

function MapPage(props: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.menuSection}>
        <Tabs aria-label="menu sections">
          <Item title="Filter">
            <MapFilterForm />
          </Item>
          <Item title="Layer">
            <MapFilterForm />
          </Item>
        </Tabs>
      </div>
      <div className={styles.mapSection}>
        <MapInterface />
      </div>
      <div className={styles.dashboardSection}>
        <DataDashboard />
      </div>
    </div>
  );
}

export default MapPage;
