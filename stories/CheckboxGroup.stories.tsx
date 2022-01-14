import * as React from 'react';
import { Story } from '@storybook/react';

import {
  Checkbox,
  CheckboxGroup,
} from '../packages/@wprdc-components/checkbox-group';
import { CheckboxGroupProps } from '../packages/@wprdc-types/checkbox-group';

export default {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
};

const Template: Story<CheckboxGroupProps> = (args) => (
  <CheckboxGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Favorite Datasets',
  children: [
    <Checkbox value="cat-census">Cat Census</Checkbox>,
    <Checkbox value="dog-biz">Dog Businesses</Checkbox>,
    <Checkbox value="rat-colony-permits" isDisabled>
      Rat Colony Permits
    </Checkbox>,
  ],
};

export const Items = Template.bind({});
Items.args = {
  label: 'Favorite Datasets',
  items: [
    { value: 'cat-census', label: 'Cat Census' },
    { value: 'dog-biz', label: 'Dog Businesses' },
    {
      value: 'rat-colony-permits',
      label: 'Rat Colony Permits',
      isDisabled: true,
    },
  ],
};
