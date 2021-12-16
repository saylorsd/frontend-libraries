import * as React from 'react';
import { Story } from '@storybook/react';

import { Tooltip } from '../packages/@wprdc-components/tooltip';
import { TooltipProps } from '../packages/@wprdc-types/tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

const Template: Story<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <button>click me, please</button>
  </Tooltip>
);

export const Primary = Template.bind({});
Primary.args = {
  content: <div>Thanks!</div>,
};
