import * as React from 'react';
import { Story } from '@storybook/react';

import { MissingVizMessage } from '../packages/@wprdc-components/missing-viz-message';
import { MissingVizMessageProps } from '../packages/@wprdc-types/missing-viz-message';

export default {
  title: 'MissingVizMessage',
  component: MissingVizMessage,
};

const Template: Story<MissingVizMessageProps> = (args) => (
  <MissingVizMessage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: '🤒 API running a fever.',
};
