import * as React from 'react';
import { Tags } from '../packages/@wprdc-components/tags';
import { TagProps } from '../packages/@wprdc-types/tag';
import { TagsProps } from '../packages/@wprdc-types/tags';
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
