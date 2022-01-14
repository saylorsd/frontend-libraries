import * as React from 'react';

import { LoadingMessage } from '../packages/@wprdc-components/loading-message';

export default {
  title: 'Components/LoadingMessage',
  component: LoadingMessage,
};

export const Default = () => (
  <div className="p-3">
    <LoadingMessage name="something" />
  </div>
);
