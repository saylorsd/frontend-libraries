/**
 *
 * LoadingMessage
 *
 */
import React from 'react';

import './main.css';
import styles from './LoadingMessage.module.css';

import { LoadingMessageProps } from '@wprdc-types/loading-message';
// import { Spinner } from '@wprdc-components/spinner';

export const LoadingMessage: React.FC<LoadingMessageProps> = ({ name }) => {
  const displayName = !!name ? ` ${name}` : '';

  return (
    <div className={styles.container}>
      <div>
        <div>
          <p>Loading{displayName}...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;
