/*
 * Hover Popup
 *
 * Light-weight popup with minimal necessary information.
 */

import * as React from 'react';

import '../main.css';

import { _useMapControl as useMapControl } from 'react-map-gl';

import { ClickPopupProps } from '@wprdc-types/map';

import { Popup } from './Popup';

export const ClickPopup: React.FC<ClickPopupProps> = ({
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
      ></div>
    </Popup>
  );
};

ClickPopup.defaultProps = {};
