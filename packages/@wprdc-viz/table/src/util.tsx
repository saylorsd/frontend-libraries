import React from 'react';
import { Variable } from '@wprdc-types/viz';

export function formatPercent(value?: number): React.ReactNode {
  if (typeof value === 'number')
    return value.toLocaleString(undefined, {
      style: 'percent',
      minimumSignificantDigits: 1,
      maximumSignificantDigits: 3,
    });
  return 'N/A';
}

/**
 * Extracts title  from `Variable` and formats it.
 * @param {Variable} variable
 */
export function formatCategory(variable: Variable): React.ReactNode {
  const dashes = Array(variable.depth).join('-');
  let category;
  if (!!variable.shortName)
    category = <abbr title={variable.name}>{variable.shortName}</abbr>;
  else category = variable.name;
  return (
    <p>
      {!!dashes && `${dashes} `}
      {category}
    </p>
  );
}
