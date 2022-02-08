import React from 'react';
import { Story } from '@storybook/react';

import { TextField } from '@wprdc-components/text-field';
import { TextFieldProps } from '@wprdc-types/text-field';

export default {
  title: 'Components/TextField',
  component: TextField,
};

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
