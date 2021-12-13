// import * as React from 'react';
// import './main.css';
//
// import ErrorMessage from '../ErrorMessage';
// import { ConnectedGeographySectionProps } from './types.js';
// import { useGeography } from '../../../../wprdc/packages/profiles/profiles';
// import { GeographySection } from './GeographySection';
//
// export const ConnectedGeographySection: React.FC<ConnectedGeographySectionProps> = ({
//   geogType,
//   geogID,
//   ...otherProps
// }) => {
//   const { geog, isLoading, error } = useGeography(geogType, geogID);
//
//   if (!!error) {
//     return (
//       <div className="h-max">
//         <ErrorMessage
//           variant="centered"
//           title={`${geogID} Not Found`}
//           message={error}
//         />
//       </div>
//     );
//   }
//   if (!!geog) {
//     return (
//       <GeographySection geog={geog} geogIsLoading={isLoading} {...otherProps} />
//     );
//   }
//   return <div />;
// };
