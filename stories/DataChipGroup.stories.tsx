import * as React from 'react';
import { Story } from '@storybook/react';

import { DataChipGroup } from '../packages/@wprdc-components/data-chip-group';
import { DataChipGroupProps } from '../packages/@wprdc-types/data-chip-group';

export default {
  title: 'Components/DataChipGroup',
  component: DataChipGroup,
};

const Template: Story<DataChipGroupProps> = (args) => (
  <DataChipGroup {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
