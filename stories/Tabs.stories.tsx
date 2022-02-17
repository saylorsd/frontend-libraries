import * as React from 'react';
import { Story } from '@storybook/react';

import { Tabs } from '../packages/@wprdc-components/tabs';
import { TabsProps } from '../packages/@wprdc-types/tabs';
import { Item } from '../packages/@wprdc-components/util';
import { Resource } from '../packages/@wprdc-types/shared';

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

const Template: Story<TabsProps<Resource>> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  'aria-label': 'Tabs example',
  disabledKeys: ['thing2'],
  children: [
    <Item key="thing1" title="Stuff">
      Peace at the universe was the death of nuclear flux, lowered to a chemical
      mermaid.
    </Item>,
    <Item key="thing2" title="More stuff">
      The particle meets death like a unrelated vogon.
    </Item>,
    <Item key="thing3" title="A topic of sorts">
      Sensors walk with moon at the interstellar colony.
    </Item>,
    <Item key="thing4" title="Stuff">
      Modification at the homeworld was the future of mystery, beamed to a
      sub-light ship.
    </Item>,
    <Item key="thing5" title="📊 Business">
      Astronauts meet with energy at the ancient solar sphere.
    </Item>,
    <Item key="thing6" title="Tabs">
      Spaces tremble with life at the bare homeworld.
    </Item>,
  ],
};
