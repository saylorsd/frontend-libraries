import * as React from 'react';
import { Tag, TagProps } from '.';
import { Story } from '@storybook/react';

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
