import * as React from 'react';
import {
  ConnectedGeographySection,
  ConnectedGeographySectionProps,
  GeographySection,
} from './';
import { GeographyType } from '../../types';
import { Story } from '@storybook/react';

export default {
  title: 'GeographySection',
  component: GeographySection,
};

const Template: Story<ConnectedGeographySectionProps> = (args) => (
  <ConnectedGeographySection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  geogType: GeographyType.Tract,
  geogID: '42003415002',
};
