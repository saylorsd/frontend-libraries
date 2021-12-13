import * as React from 'react';
import { MissingVizMessage, MissingVizMessageProps } from '.';
import { Story } from '@storybook/react';

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
