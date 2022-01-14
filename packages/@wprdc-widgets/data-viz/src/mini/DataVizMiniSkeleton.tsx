import React from 'react';
import styles from './DataVizMiniSkeleton.module.css';
import classNames from 'classnames';

export const DataVizMiniSkeleton = () => (
  <div className={classNames(styles.container)}>
    <div className={styles.vizDiv}>
      <div className={styles.pulser}>
        <div className={classNames(styles.box, styles.title)} />
        <div className={classNames(styles.box, styles.value)} />
      </div>
    </div>
  </div>
);
