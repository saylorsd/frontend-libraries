import * as React from 'react';
import { MissingVizMessageProps } from '@wprdc-types/data-viz';

import '../main.css';
import styles from './Message.module.css';

export function Message(props: MissingVizMessageProps) {
  const { error } = props;
  return (
    <div className={styles.container}>
      <p className={styles.title}>No results</p>
      <p className={styles.message}>{error || 'Error generating data viz.'}</p>
    </div>
  );
}

export default Message;
