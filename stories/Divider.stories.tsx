import * as React from 'react';
import { Story } from '@storybook/react';

import { Divider } from '../packages/@wprdc-components/divider';
import { DividerProps } from '../packages/@wprdc-types/divider';

export default {
  title: 'Components/Divider',
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
