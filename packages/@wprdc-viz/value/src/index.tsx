/**
 *
 * BigValue
 *
 */
import React from 'react';

import { BigValueViz, TabularData, VizProps } from '../../types';
import classNames from 'classnames';

interface Props extends VizProps<BigValueViz, TabularData> {}

export function BigValue(props: Props) {
  const { dataViz, inPreview } = props;
  const { data, error } = dataViz;

  if (!data || !data[0]) return <div />;
  if (error.level) {
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
    typeof value === 'number'
      ? value.toLocaleString(
          'en-US',
          primaryVariable ? primaryVariable.localeOptions : undefined,
        )
      : undefined;

  const displayPercent =
    typeof percent === 'number' ? (
      <span
      // className={classNames({
      //   'text-gray-500 text-3xl': !!denomVariable,
      // })}
      >
        {' '}
        ({percent.toLocaleString('en-US', { style: 'percent' })})
      </span>
    ) : undefined;

  const displayDenom =
    typeof denom === 'number' ? (
      <span className="text-gray-500 text-3xl">
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
        'flex h-full items-center justify-center': inPreview,
      })}
    >
      <div>
        <p className="text-sm font-semibold p-0 m-0 text-gray-500 leading-none">
          {dataViz.name}
        </p>
        <p className="text-4xl font-black text-gray-900 p-0 m-0 leading-none">
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
