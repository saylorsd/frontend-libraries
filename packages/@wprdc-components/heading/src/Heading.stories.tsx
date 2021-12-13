import * as React from 'react';
import { Heading, HeadingProps } from '.';
import { Story } from '@storybook/react';

export default {
  title: 'Heading',
  component: Heading,
};

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  level: 1,
  children: 'Heading',
};
