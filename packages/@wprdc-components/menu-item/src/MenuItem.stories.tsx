import React from 'react';
import { MenuItem, MenuItemProps } from './';
import { Story } from '@storybook/react';

export default {
  title: 'MenuItem',
  component: MenuItem,
};

const Template: Story<MenuItemProps> = (args) => <MenuItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
