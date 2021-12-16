// noinspection SqlResolve

import * as React from 'react';
import { Map } from './Map';
import { LayerPanelVariant } from './types';
import { DataVizID, DataVizType } from '../../types';

export default {
  title: 'Map',
  component: Map,
};

export const Default: React.FC = () => {
  return (
    <div className="h-96 border-black border-2">
      <Map
        mapboxApiAccessToken="pk.eyJ1Ijoic3RldmVuZHNheWxvciIsImEiOiJja295ZmxndGEwbGxvMm5xdTc3M2MwZ2xkIn0.WDBLMZYfh-ZGFjmwO82xvw"
        layerPanelVariant={LayerPanelVariant.Inside}
        assetTypes={assetTypes}
        profilesLayers={profilesLayers}
        profilesLayersSelection="all"
        defaultSelectedCartoLayerID="vax-aa-full"
      />
    </div>
  );
};

const profilesLayers: DataVizID[] = [
  {
    id: 58,
    name: 'Population Under 18',
    slug: 'pop-under18-map',
    vizType: DataVizType.MiniMap,
    description: 'Count and percentage of population ages 0 - 17',
  },
];

const assetTypes = [
  {
    name: 'nursing_homes',
    title: 'Nursing Homes',
  },
  {
    name: 'veterans_social_orgs',
    title: "Veteran's Social Orgs",
  },
  {
    name: 'va_facilities',
    title: 'VA Facilities',
  },
  {
    name: 'public_buildings',
    title: 'Public Buildings',
  },
  {
    name: 'schools',
    title: 'Schools',
  },
  {
    name: 'health_centers',
    title: 'Health Centers',
  },
  {
    name: 'rec_centers',
    title: 'Rec Centers',
  },
  {
    name: 'museums',
    title: 'Museums',
  },
];
