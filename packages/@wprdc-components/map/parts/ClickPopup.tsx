/*
 * Hover Popup
 *
 * Light-weight popup with minimal necessary information.
 */

import * as React from 'react';
import '../../../styles/global.css';

import { ConnectedAssetDetails } from '../../AssetDetails';
import { ClickPopupProps } from '../types';
import { Popup } from './Popup';
import { _useMapControl as useMapControl } from 'react-map-gl';

export const ClickPopup: React.FC<ClickPopupProps> = ({
  assets,
  profiles,
  menuGeog,
  // menuItem,
  latitude,
  longitude,
  onClose,
  ...otherProps
}) => {
  const { containerRef } = useMapControl({
    captureScroll: true,
    captureDrag: true,
    captureClick: true,
    captureDoubleClick: true,
    capturePointerMove: true,
  });

  const assetSection =
    !!assets && !!assets.length ? (
      <ConnectedAssetDetails
        id={assets[0].id}
        name={assets[0].name}
        viewProps={{ borderWidth: undefined }}
      />
    ) : null;

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={onClose}
      {...otherProps}
    >
      <div
        ref={containerRef}
        className="bg-background rounded-sm border border-gray-700"
      >
        {assetSection}
        {/*{profilesSection}*/}
      </div>
    </Popup>
  );
};

ClickPopup.defaultProps = {};
