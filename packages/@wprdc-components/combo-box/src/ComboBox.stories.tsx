import React from 'react';
import { ComboBox, Item } from './';
import { makeGeogComboBox } from './connections';
import { GeographyType } from '../../types';

export default {
  title: 'ComboBox',
  component: ComboBox,
};

export const Default = () => (
  <ComboBox label='Favorite Animal'>
    <Item key='red panda'>Red Panda</Item>
    <Item key='cat'>Cat</Item>
    <Item key='dog'>Dog</Item>
    <Item key='aardvark'>Aardvark</Item>
    <Item key='kangaroo'>Kangaroo</Item>
    <Item key='snake'>Snake</Item>
  </ComboBox>
);


export const Neighborhood = () => {
  const NeighborhoodComboBox = makeGeogComboBox(GeographyType.Neighborhood);
  return <NeighborhoodComboBox label="Select a neighborhood" />;
};

export const ZipCode = () => {
  const NeighborhoodComboBox = makeGeogComboBox(GeographyType.ZCTA);
  return <NeighborhoodComboBox label="Select a Zip code" />;
};
