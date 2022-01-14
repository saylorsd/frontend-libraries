/**
 *
 * Spinner
 *
 * Indeterminate loading spinner
 *
 */
import * as React from 'react';
import './main.css';

import ScaleLoader from 'react-spinners/ScaleLoader';

import { SpinnerProps } from '@wprdc-types/spinner';

export const Spinner: React.FC<SpinnerProps> = () => {
  return <ScaleLoader height={35} width={4} margin={2} radius={2} />;
};

export default Spinner;
