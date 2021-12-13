import React from 'react';
import { Tooltip, TooltipProps } from './';
import { Story } from '@storybook/react';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

const Template: Story<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <button>click me, please</button>
  </Tooltip>
);

export const Primary = Template.bind({});
Primary.args = {
  content: <div>Thanks!</div>,
};
