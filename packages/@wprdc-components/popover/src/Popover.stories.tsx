import React from 'react';
import { Popover, PopoverProps } from './';
import { Story } from '@storybook/react';

export default {
  title: 'Popover',
  component: Popover,
};

const Template: Story<PopoverProps> = (args) => <Popover {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
