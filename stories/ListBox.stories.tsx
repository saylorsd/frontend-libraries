import * as React from 'react';
import { ListBox } from '../packages/@wprdc-components/list-box';

import { Item, Section } from '@react-stately/collections';

export default {
  title: 'ListBox',
  component: ListBox,
};

export const Default = () => (
  <div className="w-h">
    <ListBox selectionMode="multiple">
      <Section title="section">
        <Item>A thing</Item>
        <Item>Another thing</Item>
        <Item>One more thing</Item>
      </Section>
      <Section title="Section 2">
        <Item>Imbers velum</Item>
        <Item>Nunquam anhelare eleates</Item>
        <Item>Resistentia clemens</Item>
      </Section>
    </ListBox>
  </div>
);
