import * as React from 'react';
import { Button, ButtonProps } from '.';
import { Story } from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'default',
  children: 'Press me',
  onPress: () => alert('Thanks!'),
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Press me',
  onPress: () => alert('Thanks!'),
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Press me',
  onPress: () => alert('Thanks!'),
};

export const None = Template.bind({});
None.args = {
  color: 'none',
  children: 'Press me',
  onPress: () => alert('Thanks!'),
};
