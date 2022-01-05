import * as React from 'react';
import { Story } from '@storybook/react';

import { Tabs, Item } from '../packages/@wprdc-components/tabs';
import { TabsProps } from '../packages/@wprdc-types/tabs';

export default {
  title: 'Tabs',
  component: Tabs,
};

const Template: Story<
  TabsProps<{ value: number; title: string; content: React.ReactNode }>
> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  'aria-label': 'History of Ancient Rome',
  disabledKeys: ['Emp'],
  children: [
    <Item key="FoR" title="Founding of Rome">
      Arma virumque cano, Troiae qui primus ab oris.
    </Item>,
    <Item key="MaR" title="Monarchy and Republic">
      Senatus Populusque Romanus.
    </Item>,
    <Item key="Emp" title="Empire">
      Alea jacta est.
    </Item>,
  ],
};
