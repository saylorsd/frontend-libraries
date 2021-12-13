import * as React from 'react';
import { Divider, DividerProps } from '.';
import { Story } from '@storybook/react';

export default {
  title: 'Divider',
  component: Divider,
};

const Template: Story<DividerProps> = (args) => (
  <div>
    First side
    <Divider {...args} />
    Second side
  </div>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  vertical: false,
  weight: 'thin',
};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
  weight: 'thick',
};
