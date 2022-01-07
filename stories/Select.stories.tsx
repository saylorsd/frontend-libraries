import * as React from 'react';
import { Item, Select } from '../packages/@wprdc-components/select';

export default {
  title: 'Select',
  component: Select,
};

export const Default = () => (
  <div>
    <Select label="Select an Animal" onSelectionChange={console.log}>
      <Item key="red panda">Red Panda</Item>
      <Item key="cat">Cat</Item>
      <Item key="dog">Dog</Item>
      <Item key="aardvark">Aardvark</Item>
      <Item key="kangaroo">Kangaroo</Item>
      <Item key="snake">Snake</Item>
    </Select>
    <div>Bottom tfasdf adsf asd fasd fa sfasdfext</div>
  </div>
);
