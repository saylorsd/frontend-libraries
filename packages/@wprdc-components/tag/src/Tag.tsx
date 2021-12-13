/**
 *
 * Tag
 *
 *  Little bit of metadata.
 *
 */
import * as React from 'react';

import './main.css';
import styles from './Tag.module.css';

import classNames from 'classnames';

import { TagProps } from '@wprdc-types/tag';

export const Tag: React.FC<TagProps> = ({ label, variant = 'default' }) => {
  return (
    <div className={classNames([styles.wrapper, styles[variant]])}>
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default Tag;
