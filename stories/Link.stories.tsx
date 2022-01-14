import * as React from 'react';
import { Story } from '@storybook/react';

import Link from '../packages/@wprdc-components/link';
import { LinkProps } from '../packages/@wprdc-types/link';

export default {
  title: 'Components/Link',
  component: Link,
};

const Template: Story<LinkProps> = (args) => <Link {...args} />;
const Default = Template.bind({});
Default.args = {};
