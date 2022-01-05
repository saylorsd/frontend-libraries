import * as React from 'react';

import 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  InteractiveMap,
  InteractiveMapProps,
  ViewportProps,
} from 'react-map-gl';

export function Map(props: InteractiveMapProps) {
  const [viewport, setViewport] = React.useState<ViewportProps>();

  return (
    <InteractiveMap
      {...viewport}
      {...props}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
    >
      <p>test</p>
    </InteractiveMap>
  );
}
