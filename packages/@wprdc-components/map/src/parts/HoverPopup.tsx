/*
 * Hover Popup
 *
 * Light-weight popup with minimal necessary information.
 */

import * as React from 'react';
import '../main.css';

import { ConnectedHoverPopupProps } from '@wprdc-types/map';
// import { PopupSection } from './PopupSection';
import { Popup } from './Popup';

export const HoverPopup: React.FC<ConnectedHoverPopupProps> = ({
  latitude,
  longitude,
  onClose,
  children,
  connections,
  ...otherProps
}) => {
  // todo: use connections to get content
  // // Menu
  // const menuSection = React.useMemo(() => {
  //   return !!menuGeog ? (
  //     <PopupSection
  //       label={`${toTitleCase(menuGeog.geogType)}`}
  //       icon={RiRoadMapFill}
  //     >
  //       <div className="ml-1">{menuGeog.name}</div>
  //     </PopupSection>
  //   ) : null;
  // }, [menuGeog]);
  //
  // // Neighborhood Assets
  // const assetSection = React.useMemo(() => {
  //   return !!assets && assets.length ? (
  //     <PopupSection label="Neighborhood Assets" icon={RiCommunityFill}>
  //       <ul className="pl-1">
  //         {assets.map((asset) => (
  //           <li>{asset.name}</li>
  //         ))}
  //       </ul>
  //     </PopupSection>
  //   ) : null;
  // }, [assets]);
  //
  // const profilesSection = React.useMemo(() => {
  //   return !!profiles && profiles.length ? (
  //     <PopupSection label="Community Profiles" icon={RiBarChartFill}>
  //       <div>{profiles}</div>
  //     </PopupSection>
  //   ) : null;
  // }, [profiles]);
  //
  // const showDataSection = !!menuSection || !!assetSection || !!profilesSection;

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={onClose}
      {...otherProps}
    >
      <div className="bg-background p-1 rounded border border-gray-700">
        {children}
      </div>
    </Popup>
  );
};

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

HoverPopup.defaultProps = {};
