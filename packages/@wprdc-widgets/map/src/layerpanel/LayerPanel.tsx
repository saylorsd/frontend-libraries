import * as React from 'react';
import '../main.css';

import { _useMapControl as useMapControl } from 'react-map-gl';

import { ConnectedLayerPanelProps } from '@wprdc-types/connections';

export const LayerPanel: React.FC<ConnectedLayerPanelProps> = (props) => {
  const { toolboxes } = props;

  const { containerRef } = useMapControl({
    captureScroll: true,
    captureDrag: true,
    captureClick: true,
    captureDoubleClick: true,
    capturePointerMove: true,
  });
  // extract sections from the toolboxes that have them
  const sections = toolboxes.reduce((sxns, tb) => {
    if (!!tb.layerPanelSection) return [...sxns, tb.layerPanelSection];
    return sxns;
  }, [] as React.ReactNode[]);

  // if nothing to show, don't render anything
  if (!sections || !sections.length) return null;

  return <div ref={containerRef}>{sections}</div>;
};
