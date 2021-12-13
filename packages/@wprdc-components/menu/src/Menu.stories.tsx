import { Item } from '@react-stately/collections';
import * as React from 'react';
import { Menu } from '.';

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
