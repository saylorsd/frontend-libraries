import * as React from 'react';
import { Spinner } from '../packages/@wprdc-components/spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
};

export const Default = () => (
  <div className="p-3">
    <Spinner />
  </div>
);
