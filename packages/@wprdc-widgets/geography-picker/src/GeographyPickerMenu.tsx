/**
 *
 * GeographyPicker
 *
 * Used to select a geographic area
 *
 */
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import './main.css';
import styles from './GeographyPickerMenu.module.css';

import { Select } from '@wprdc-components/select';
import { ConnectedSearchBox } from '@wprdc-components/search-box';
import { Map } from '@wprdc-components/map';

import {
  menuLayerConnection,
  GeographyConnection,
  GeoAPI,
} from '@wprdc-connections/geo';

import { GeogBrief, GeogLevel } from '@wprdc-types/geo';
import { LayerPanelVariant } from '@wprdc-types/map';

import {
  ConnectedMapEventHandler,
  ConnectionCollection,
} from '@wprdc-types/connections';

import { ProjectKey } from '@wprdc-types/shared';

import { Item } from '@react-stately/collections';

import { GeographyPickerMenuProps } from './types';

export const GeographyPickerMenu: React.FC<GeographyPickerMenuProps> = ({
  selectedGeog,
  onSelection,
}) => {
  const [geogLevels, setGeogLevels] = useState<GeogLevel[]>();
  const [selectedGeogLevel, setSelectedGeogLevel] = useState<GeogLevel>();

  // on mount, get list of available layers
  useEffect(() => {
    GeoAPI.requestGeoLayers().then(({ data }) => setGeogLevels(data));
  }, []);

  // when the geogLevels load, select a default geogLevel
  useEffect(() => {
    if (!!geogLevels) {
      setSelectedGeogLevel(
        geogLevels.find((layer) => layer.id === selectedGeog?.geogType) ||
          geogLevels[0]
      );
    }
  }, [geogLevels]);

  function handleGeogSelection(geog: GeogBrief) {
    if (!!onSelection) onSelection(geog);
  }

  const handleClick: ConnectedMapEventHandler = (_, __, toolboxItems) => {
    if (!!toolboxItems) {
      const selection = toolboxItems[ProjectKey.GeoMenu];
      if (!!selection) handleGeogSelection(selection);
    }
  };

  const geogTypeSelection: Set<string> = useMemo(() => {
    if (!!selectedGeogLevel) return new Set([selectedGeogLevel.id]);
    return new Set();
  }, [selectedGeogLevel]);

  if (!geogLevels || !geogLevels.length || !selectedGeogLevel) return null;

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.menuItem}>
          <div className={styles.dropdown}>
            <div className={styles.labelText}>Pick a type of area</div>
            <Select<GeogLevel>
              aria-label="Type of area"
              items={geogLevels}
              selectedKey={selectedGeogLevel.id}
              onSelection={(item) => setSelectedGeogLevel(item)}
            >
              {(item) => <Item key={item.id}>{item.name}</Item>}
            </Select>
          </div>
        </div>
        <div className={styles.menuItem}>
          <div className={styles.dropdown}>
            <div className={styles.labelText}>
              Search for a {selectedGeogLevel.name}
            </div>
            <ConnectedSearchBox
              connection={new GeographyConnection(selectedGeogLevel.id)}
              onSelection={handleGeogSelection}
            />
          </div>
        </div>
      </div>
      <div className={styles.map}>
        <Map
          defaultViewport={{ zoom: 7 }}
          layerPanelVariant={LayerPanelVariant.None}
          connections={[menuLayerConnection] as ConnectionCollection}
          onClick={handleClick}
          connectionHookArgs={{
            [ProjectKey.GeoMenu]: {
              layerItems: [],
              layerSelection: geogTypeSelection,
            },
          }}
        />
      </div>
    </div>
  );
};

export default GeographyPickerMenu;
