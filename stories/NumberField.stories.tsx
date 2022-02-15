import React from 'react';
import { Story } from '@storybook/react';

import { NumberField } from '@wprdc-components/number-field';
import { NumberFieldProps } from '@wprdc-types/number-field';

export default {
  title: 'Components/NumberField',
  component: NumberField,
};

const Template: Story<NumberFieldProps> = (args) => <NumberField {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
