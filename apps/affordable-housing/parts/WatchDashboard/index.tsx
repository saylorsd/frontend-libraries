/**
 *
 * DataDashboard
 *
 */
import * as React from 'react';

import styles from './WatchDashboard.module.css';

interface Props {
  title: string;
  current: string;
}

function WatchDashboard(props: Props) {
  return (
    <div>
      <h2 className={styles.title}>Example Owner</h2>
      <div>
        <span className={styles.subfield}>All data current as of </span>
        <span className={styles.value}>02/01/21</span>
      </div>
      <div className={styles.fieldSection}>
        <div>
          <span className={styles.field}>Total Properties: </span>
          <span className={styles.value}>7</span>
        </div>
        <div>
          <span className={styles.subfield}>increase/decrease: </span>
          <span className={styles.value}>7</span>
        </div>
      </div>
    </div>
  );
}

export default WatchDashboard;
