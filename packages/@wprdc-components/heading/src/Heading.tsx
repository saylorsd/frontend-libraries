/**
 *
 * Heading
 *
 * Section heading
 *
 */
import * as React from 'react';
import './main.css';
import styles from './Heading.module.css';
import { HeadingProps } from '@wprdc-types/heading';

export const Heading: React.FC<HeadingProps> = ({ level = 3, ...rest }) => {
  const HeadingElem: string = `h${level}`;
  return <HeadingElem className={styles[HeadingElem]} {...rest} />;
};
