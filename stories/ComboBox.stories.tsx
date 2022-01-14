import * as React from 'react';

import { ComboBox, Item } from '../packages/@wprdc-components/combo-box';

export default {
  title: 'Components/ComboBox',
  component: ComboBox,
};

export const Default = () => (
  <ComboBox label="Favorite Animal">
    <Item key="red panda">Red Panda</Item>
    <Item key="cat">Cat</Item>
    <Item key="dog">Dog</Item>
    <Item key="aardvark">Aardvark</Item>
    <Item key="kangaroo">Kangaroo</Item>
    <Item key="snake">Snake</Item>
  </ComboBox>
);

// Todo: remake this
// import { makeGeogComboBox } from './connections';
//import { GeographyType } from '../packages/@wprdc-types/geo';
// export const Neighborhood = () => {
//   const NeighborhoodComboBox = makeGeogComboBox(GeographyType.Neighborhood);
//   return <NeighborhoodComboBox label="Select a neighborhood" />;
// };
//
// export const ZipCode = () => {
//   const NeighborhoodComboBox = makeGeogComboBox(GeographyType.ZCTA);
//   return <NeighborhoodComboBox label="Select a Zip code" />;
// };
