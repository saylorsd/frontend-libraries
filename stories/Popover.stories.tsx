import * as React from 'react';
import { Story } from '@storybook/react';

import { Popover } from '../packages/@wprdc-components/popover';
import { PopoverProps } from '../packages/@wprdc-types/popover';

export default {
  title: 'Components/Popover',
  component: Popover,
};

const Template: Story<PopoverProps> = (args) => <Popover {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
