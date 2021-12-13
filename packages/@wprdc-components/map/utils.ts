import { Feature } from 'geojson';
import { LayerProps, MapEvent, SourceProps } from 'react-map-gl';
import {
  ASSETS_SOURCE_ID,
  MAPS_API_ENDPOINT,
  PROFILES_SOURCE_ID,
} from './settings';
import { GeographyType } from '../../types';
import { Expression } from 'mapbox-gl';
import { AssetMapProperties } from '../../types/communityAssets';
import { PopupContentProps } from './types';

export function makeContentProps(event: MapEvent): PopupContentProps {
  const features: Feature[] = event.features || [];
  const primaryFeatureProps = !!features.length ? features[0].properties : {};

  return { event, features, primaryFeatureProps };
}

export function extractFeatureFromEvent(event: MapEvent): Feature | undefined {
  if (event && event.features && event.features.length) {
    return event.features[0];
  }
  return undefined;
}

export function hasFeatures(event: MapEvent): boolean {
  return !!extractFeatureFromEvent(event);
}

export function cartoInstantiationParams(id: string, sql: string) {
  return {
    layers: [
      {
        id,
        options: {
          sql,
        },
      },
    ],
  };
}

type cartoResponse = {
  metadata: { tilejson: { vector: { tiles: string[] } } };
};

export function extractCartoTileUrls(data: cartoResponse): string[] {
  return data.metadata.tilejson.vector.tiles;
}

export function fetchCartoVectorSource(
  id: string,
  sql: string,
  apiKey?: string,
  type = 'vector',
  minzoom = 0,
  maxzoom = 22
): PromiseLike<SourceProps> {
  const config = encodeURIComponent(
    JSON.stringify(cartoInstantiationParams(id, sql))
  );

  const keyParam = apiKey ? `&api_key=${apiKey}` : '';

  return new Promise((resolve, reject) => {
    fetch(`${MAPS_API_ENDPOINT}?config=${config}${keyParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        (response) => response.json(),
        (error) => reject(error)
      )
      .then(
        (data) => {
          resolve({
            id,
            type,
            tiles: extractCartoTileUrls(data),
            minzoom,
            maxzoom,
          });
        },
        (error) => reject(error)
      );
  });
}

export function getHoverPopupItems(
  features: any[],
  menuGeogType?: GeographyType
): {
  assetsItems: AssetMapProperties[];
  profilesItems: Record<string, any>[];
  menuGeog: Record<'geogid' | 'name' | string, any>;
} {
  const sorted = sortFeatures(features, menuGeogType);
  return {
    assetsItems: sorted[ASSETS_SOURCE_ID],
    profilesItems: sorted[PROFILES_SOURCE_ID],
    menuGeog: sorted.menuGeog,
  };
}

/**
 * Sort features into project-specific lists.
 * @param features
 * @param menuGeogType
 */
function sortFeatures(
  features: any[],
  menuGeogType?: GeographyType
): {
  w__assets: AssetMapProperties[];
  w__profiles: Record<string, any>[];
  menuGeog: Record<string, any>;
} {
  const sortedFeatures = {
    [ASSETS_SOURCE_ID]: [] as AssetMapProperties[],
    [PROFILES_SOURCE_ID]: [] as Record<string, any>[],
    menuGeog: {} as Record<string, any>,
  };

  for (const feature of features) {
    if (!feature || !feature.source || !feature.properties) continue;
    if (feature.source in sortedFeatures) {
      sortedFeatures[feature.source as keyof typeof sortedFeatures].push(
        feature.properties as Record<string, any>
      );
    }
    if (menuGeogType && feature.source === menuGeogType) {
      sortedFeatures.menuGeog = feature.properties as Record<string, any>;
    }
  }
  return sortedFeatures;
}

export const layerType = (l: LayerProps) => l.id && l.id.split('/')[1];

export const layerFilter = (l: LayerProps) => layerType(l) === 'fill';

export function filterLayerByGeogID(geogID: string): Expression {
  return ['==', 'geogid', geogID];
}

export function clearLayerFilter(): Expression {
  return ['==', 'geogid', 'w00t'];
}

/**
 *
 * @param layers
 * @param hoveredFilter
 * @param selectedFilter
 */
export function filteredLayers(
  layers: LayerProps[],
  hoveredFilter: Expression,
  selectedFilter: Expression
): LayerProps[] {
  return layers.map((layer) => {
    switch (getLayerType(layer)) {
      case 'hover':
        return { ...layer, filter: hoveredFilter };
      case 'selected':
        return { ...layer, filter: selectedFilter };
      default:
        return layer;
    }
  });
}

export function getLayerType(layer: LayerProps) {
  if (!!layer.id) return layer.id.split('/')[1];
  return '';
}

export const DEFAULT_GEOIDS: Record<GeographyType, string> = {
  [GeographyType.County]: '42003',
  [GeographyType.State]: '42',
  [GeographyType.CountySubdivision]: '4200361000',
  [GeographyType.Tract]: '42003040200',
  [GeographyType.BlockGroup]: '420030402002',
  [GeographyType.ZCTA]: '15213',
  [GeographyType.SchoolDistrict]: '4219170',
  [GeographyType.Neighborhood]: '4219170',
};
