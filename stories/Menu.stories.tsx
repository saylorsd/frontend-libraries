import * as React from 'react';
import { Menu, Item } from '../packages/@wprdc-components/menu';

export default {
  title: 'Menu',
  component: Menu,
};

export const Default = () => (
  <Menu>
    <Item>Thing 1</Item>
    <Item>Thing 2</Item>
  </Menu>
);
