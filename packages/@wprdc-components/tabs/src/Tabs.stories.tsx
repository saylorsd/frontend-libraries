import React from 'react';
import { Tabs, TabsProps } from './';
import { Story } from '@storybook/react';
import { Item } from '@react-stately/collections';
import { ConnectedAssetDetails } from '../AssetDetails';

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

export const Secondary = Template.bind({});
Secondary.args = {
  items: [
    { value: 1, title: 'Tab One', content: 'content' },
    {
      value: 2,
      title: 'Tab Two',
      content: <ConnectedAssetDetails id={204270} />,
    },
    { value: 3, title: 'Tab Three', content: 'some more content' },
  ],
  children: (item) => (
    <Item key={`${item.value}`} title={item.title}>
      {item.content}
    </Item>
  ),
};
