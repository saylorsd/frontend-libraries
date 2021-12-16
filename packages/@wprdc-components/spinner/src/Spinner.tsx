/**
 *
 * Spinner
 *
 * Indeterminate loading spinner
 *
 */
import * as React from 'react';
import './main.css';

import { Bars } from 'svg-loaders-react';

import { SpinnerProps } from '@wprdc-types/spinner';

export const Spinner: React.FC<SpinnerProps> = ({ size, ...props }) => {
  return <Bars stroke="#98ff98" fill="#000000" />;
};

export default Spinner;
