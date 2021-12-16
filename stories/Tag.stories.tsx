import * as React from 'react';
import { Story } from '@storybook/react';

import { Tag } from '../packages/@wprdc-components/tag';
import { TagProps } from '../packages/@wprdc-types/tag';

export default {
  title: 'Tag',
  component: Tag,
};

const Template: Story<TagProps> = (args) => <Tag {...args} />;

const Default = Template.bind({});
Default.args = {
  variant: 'default',
  label: 'Tag',
};

const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  label: 'Primary tag',
};

const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  label: 'Secondary tag',
};
