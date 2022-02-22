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
import { FilterFormValues } from '../types';

interface Props {}

function MapPage(props: Props) {
  const [filterParams, setFilterParams] = React.useState<FilterFormValues>();

  function handleFormChange(params: FilterFormValues) {
    setFilterParams(params);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.menuSection}>
        <Tabs aria-label="menu sections">
          <Item title="Filter">
            <MapFilterForm onSubmit={handleFormChange} />
          </Item>
          <Item title="Layer">TBD</Item>
        </Tabs>
      </div>
      <div className={styles.mapSection}>
        <MapInterface filterParams={filterParams} />
      </div>
      <div className={styles.dashboardSection}>
        <DataDashboard />
      </div>
    </div>
  );
}

export default MapPage;
