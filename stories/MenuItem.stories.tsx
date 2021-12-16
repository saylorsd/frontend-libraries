import * as React from 'react';
import { Story } from '@storybook/react';

import { MenuItem } from '../packages/@wprdc-components/menu-item';
import { MenuItemProps } from '../packages/@wprdc-types/menu-item';

export default {
  title: 'MenuItem',
  component: MenuItem,
};

const Template: Story<MenuItemProps> = (args) => <MenuItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
