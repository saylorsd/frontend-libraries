/**
 *
 * MissingVizMessage
 *
 */
import React from 'react';
import { MissingVizMessageProps } from '@wprdc-types/missing-viz-message';

import './main.css';
import styles from './MissingVizMessage.module.css';

export function MissingVizMessage(props: MissingVizMessageProps) {
  const { error } = props;
  return (
    <div className={styles.container}>
      <p className={styles.title}>No results</p>
      <p className={styles.message}>{error || 'Error generating data viz.'}</p>
    </div>
  );
}

export default MissingVizMessage;
