import React from 'react';
import { DataChipGroup, DataChipGroupProps } from './';
import { Story } from '@storybook/react';

export default {
  title: 'DataChipGroup',
  component: DataChipGroup,
};

const Template: Story<DataChipGroupProps> = (args) => (
  <DataChipGroup {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
