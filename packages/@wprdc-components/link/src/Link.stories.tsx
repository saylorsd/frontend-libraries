import * as React from 'react';
import { Story } from '@storybook/react';
import { LinkProps } from './types';
import Link from './Link';

export default {
  title: 'Link',
  component: Link,
};

const Template: Story<LinkProps> = (args) => <Link {...args} />;
const Default = Template.bind({});
Default.args = {};
