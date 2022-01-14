import * as React from 'react';
import { Story } from '@storybook/react';

import { Heading } from '../packages/@wprdc-components/heading';
import { HeadingProps } from '../packages/@wprdc-types/heading';

export default {
  title: 'Components/Heading',
  component: Heading,
};

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  level: 1,
  children: 'Heading',
};
