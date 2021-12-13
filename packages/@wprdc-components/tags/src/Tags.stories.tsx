import * as React from 'react';
import { Tags, TagsProps } from '.';
import { TagProps } from '../Tag';
import { Story } from '@storybook/react';

export default {
  title: 'Tags',
};

const exampleTags: TagProps[] = [
  { label: 'A tag' },
  { label: 'Another tag' },
  { label: 'Primary', variant: 'primary' },
  { label: 'Secondary', variant: 'secondary' },
];

const Template: Story<TagsProps> = (args) => <Tags {...args} />;

export const Default = Template.bind({});
Default.args = {
  tags: exampleTags,
};
