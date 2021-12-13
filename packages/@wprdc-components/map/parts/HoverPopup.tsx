/*
 * Hover Popup
 *
 * Light-weight popup with minimal necessary information.
 */

import * as React from 'react';
import '../../../styles/global.css';

import { HoverPopupProps } from '../types';
import { PopupSection } from './PopupSection';
import { Popup } from './Popup';
import { toTitleCase } from '../../../util';

import { RiBarChartFill, RiCommunityFill, RiRoadMapFill } from 'react-icons/ri';

export const HoverPopup: React.FC<HoverPopupProps> = ({
  assets,
  profiles,
  menuGeog,
  latitude,
  longitude,
  onClose,
  children,
  ...otherProps
}) => {
  // Menu
  const menuSection = React.useMemo(() => {
    return !!menuGeog ? (
      <PopupSection
        label={`${toTitleCase(menuGeog.geogType)}`}
        icon={RiRoadMapFill}
      >
        <div className="ml-1">{menuGeog.name}</div>
      </PopupSection>
    ) : null;
  }, [menuGeog]);

  // Neighborhood Assets
  const assetSection = React.useMemo(() => {
    return !!assets && assets.length ? (
      <PopupSection label="Neighborhood Assets" icon={RiCommunityFill}>
        <ul className="pl-1">
          {assets.map((asset) => (
            <li>{asset.name}</li>
          ))}
        </ul>
      </PopupSection>
    ) : null;
  }, [assets]);

  const profilesSection = React.useMemo(() => {
    return !!profiles && profiles.length ? (
      <PopupSection label="Community Profiles" icon={RiBarChartFill}>
        <div>{profiles}</div>
      </PopupSection>
    ) : null;
  }, [profiles]);

  const showDataSection = !!menuSection || !!assetSection || !!profilesSection;

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={onClose}
      {...otherProps}
    >
      <div className="bg-background p-1 rounded border border-gray-700">
        {children}
        {showDataSection && (
          <div>
            {menuSection}
            {assetSection}
            {profilesSection}
          </div>
        )}
      </div>
    </Popup>
  );
};

HoverPopup.defaultProps = {};
