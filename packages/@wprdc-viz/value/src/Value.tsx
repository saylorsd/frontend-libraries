/**
 *
 * BigValue
 *
 */
import React from 'react';

import './main.css';
import styles from './Value.module.css';

import { ValueVizProps } from '@wprdc-types/viz';
import classNames from 'classnames';

export function BigValue(props: ValueVizProps) {
  const { dataViz, inPreview } = props;
  const { data, error } = dataViz;

  if (!data || !data[0]) return <div />;
  if (!!error && !!error.level) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  const { variable, value, percent, denom } = data[0];
  const primaryVariable = dataViz.variables.find((v) => v.slug === variable);

  const denomVariable =
    primaryVariable && primaryVariable.denominators
      ? primaryVariable.denominators[0]
      : undefined;

  const displayValue =
    typeof value === 'number' ? (
      <span className={styles.value}>
        {value.toLocaleString(
          'en-US',
          primaryVariable ? primaryVariable.localeOptions : undefined,
        )}
      </span>
    ) : undefined;

  const displayPercent =
    typeof percent === 'number' ? (
      <span
        className={classNames({
          [styles.denom]: !!denomVariable,
        })}
      >
        {' '}
        ({percent.toLocaleString('en-US', { style: 'percent' })})
      </span>
    ) : undefined;

  const displayDenom =
    typeof denom === 'number' ? (
      <span className={styles.denom}>
        {' /'}
        {denom.toLocaleString(
          'en-US',
          denomVariable ? denomVariable.localeOptions : undefined,
        )}
      </span>
    ) : undefined;
  return (
    <div
      className={classNames({
        [styles.inPreview]: inPreview,
      })}
    >
      <div>
        <p className={styles.name}>{dataViz.name}</p>
        <p className={styles.valueGroup}>
          {displayValue}
          <wbr />
          {displayDenom}
          <wbr />
          {displayPercent}
        </p>
      </div>
    </div>
  );
}

export default BigValue;
