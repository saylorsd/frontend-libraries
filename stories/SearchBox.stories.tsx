import * as React from 'react';
import {
  SearchBox,
  Section,
  Item,
} from '../packages/@wprdc-components/search-box';

export default {
  title: 'SearchBox',
  component: SearchBox,
};

export const Default = () => (
  <div>
    <SearchBox label="Search">
      <Section title="Companies">
        <Item>Chatterbridge</Item>
        <Item>Tagchat</Item>
        <Item>Yambee</Item>
        <Item>Photobug</Item>
        <Item>Livepath</Item>
      </Section>
      <Section title="People">
        <Item>Theodor Dawber</Item>
        <Item>Dwight Stollenberg</Item>
        <Item>Maddalena Prettjohn</Item>
        <Item>Maureen Fassan</Item>
        <Item>Abbie Binyon</Item>
      </Section>
    </SearchBox>
  </div>
);

// todo: get these back up and runnin'
// export const AffordableHousingProjects = () => (
//   <div>
//     <ConnectedSearchBox
//       connection={affordableHousingConnection}
//       label="Affordable Housing"
//     />
//   </div>
// );
//
// export const Assets = () => (
//   <div>
//     <ConnectedSearchBox
//       connection={assetsConnection}
//       label={'Neighborhood Assets'}
//     />
//   </div>
// );
//
// export const AssetTypes = () => (
//   <div>
//     <ConnectedSearchBox
//       connection={assetTypeConnection}
//       label={'Select an Asset type'}
//     />
//   </div>
// );
//
// export const ProfilesViz = () => (
//   <div>
//     <ConnectedSearchBox
//       connection={dataVizConnection}
//       label={'Find a data viz'}
//     />
//   </div>
// );
//
// export const Geography = () => (
//   <div>
//     <ConnectedSearchBox
//       connection={new GeographyConnection(GeographyType.County)}
//       label={'Find a data viz'}
//     />
//   </div>
// );
