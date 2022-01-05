import * as React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../packages/@wprdc-components/button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'default',
  children: 'Button',
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Button',
};
