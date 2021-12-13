import * as React from 'react';
import LoadingMessage from '.';

export default {
  title: 'LoadingMessage',
  component: LoadingMessage,
};

export const Default = () => (
  <div className="p-3">
    <LoadingMessage name="something" />
  </div>
);
