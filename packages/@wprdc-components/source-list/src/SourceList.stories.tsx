import * as React from 'react';
import { OverlayProvider } from '@react-aria/overlays';

import { SourceList, SourceListProps } from '.';
import { SourceBase } from '../../types';
import { Story } from '@storybook/react';

export default {
  title: 'SourceList',
  component: SourceList,
};

const exampleSources: SourceBase[] = [
  {
    id: 1,
    slug: 'test-source',
    name: 'Test Source',
    infoLink: 'https://www.wprdc.org',
    description:
      'This is a test source.  We are using it for testing purposes.',
  },
];

const Template: Story<SourceListProps> = (args) => (
  <OverlayProvider>
    <SourceList {...args} />
  </OverlayProvider>
);

export const Default = Template.bind({});
Default.args = {
  sources: exampleSources,
};
