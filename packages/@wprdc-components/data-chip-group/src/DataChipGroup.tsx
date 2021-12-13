/**
 *
 * DataChipGroup
 *
 * Group of datachips
 *
 */
import * as React from 'react';
import './main.css';
import styles from './DataChipGroup.module.css';

import { DataChipGroupProps } from '@wprdc-types/data-chip-group';

// todo: merge with data-chip
export const DataChipGroup: React.FC<DataChipGroupProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children.map(child => (
        <div className={styles.chipWrapper}>{child}</div>
      ))}
    </div>
  );
};

export default DataChipGroup;
