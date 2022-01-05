import * as React from 'react';

import { Map } from '../packages/@wprdc-components/basic-map';
import 'mapbox-gl/dist/mapbox-gl.css';
import { InteractiveMap } from 'react-map-gl';

export default {
  title: 'Basic Map',
  component: Map,
};

export const Default = () => {
  return (
    <Map
      onClick={console.log}
      style={{ border: '2px solid black' }}
      height={200}
      width={300}
      mapboxApiAccessToken={
        'pk.eyJ1Ijoic3RldmVuZHNheWxvciIsImEiOiJja295ZmxndGEwbGxvMm5xdTc3M2MwZ2xkIn0.WDBLMZYfh-ZGFjmwO82xvw'
      }
    />
  );
};
