import * as React from 'react';
import { Item, Select } from '../packages/@wprdc-components/select';

export default {
  title: 'Select',
  component: Select,
};

export const Default = () => (
  <div>
    <label id="selectLabel" className="m-0 border border-blue-800">
      stuff
    </label>
    <Select aria-labelledby="selectLabel">
      <Item key="red panda">Red Panda</Item>
      <Item key="cat">Cat</Item>
      <Item key="dog">Dog</Item>
      <Item key="aardvark">Aardvark</Item>
      <Item key="kangaroo">Kangaroo</Item>
      <Item key="snake">Snake</Item>
    </Select>
  </div>
);
