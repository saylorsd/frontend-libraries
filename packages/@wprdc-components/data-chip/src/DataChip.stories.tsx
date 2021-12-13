import * as React from 'react';
import { DataChip } from '.';
import { Story } from '@storybook/react';

export default {
  title: 'DataChip',
  component: DataChip,
  decorators: [
    (TheStory: Story) => (
      <div style={{ margin: '3em' }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Default = () => (
  <div>
    <DataChip icon="map" value="3343 Forbes Ave" label="Address" />
    <DataChip icon="map" value="3343 Forbes Ave" label="Address" color="blue" />
  </div>
);
