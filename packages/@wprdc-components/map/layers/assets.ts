import chroma from 'chroma-js';
import { LayerProps } from 'react-map-gl';
import { ColorScheme } from '../../../types';
import { AssetType } from '../../../types/communityAssets';
import { ASSETS_LAYER_ID, ASSETS_SOURCE_ID } from '../settings';
import { Expression, ExpressionName } from 'mapbox-gl';
import { Key } from 'react';
import { CategoricalLegendItemProps } from '../types';

export const makeAssetLegendItems = (
  availableAssetTypes: AssetType[],
  selectedAssetTypes: Key[],
  colorScheme: ColorScheme = ColorScheme.Light
) => {
  return availableAssetTypes
    .filter((at) => selectedAssetTypes.includes(at.name))
    .map((at) => ({
      variant: 'categorical',
      key: at.name,
      label: at.title,
      marker: categoryColors(
        selectedAssetTypes.map((t) => t.toString()),
        colorScheme
      )[at.name],
    })) as CategoricalLegendItemProps[];
};

export const makeAssetLayer = (
  categories: Key[],
  colorScheme: ColorScheme = ColorScheme.Light,
  field: string = 'asset_type'
): LayerProps => ({
  id: ASSETS_LAYER_ID,
  source: ASSETS_SOURCE_ID,
  'source-layer': ASSETS_SOURCE_ID,
  type: 'circle',
  filter: ['in', field, ...categories],
  paint: {
    'circle-radius': [
      'interpolate',
      ['cubic-bezier', 0.5, 0, 0.5, 1],
      ['zoom'],
      8,
      3,
      22,
      12,
    ],
    'circle-color': colorExpression(
      categories.map((c) => `${c}`),
      colorScheme,
      field
    ),
    'circle-stroke-width': 1,
    'circle-stroke-color': 'rgb(55,65,81)',
    'circle-stroke-opacity': {
      stops: [
        [0, 0],
        [9, 0.5],
        [12, 1],
      ],
    },
  },
});

/**
 * Generates Mapbox expression that colors map points based on category
 *
 * @param {string[]} categories
 * @param {'light' | 'dark'} colorScheme
 * @param field
 */
const colorExpression = (
  categories: string[],
  colorScheme: ColorScheme = ColorScheme.Light,
  field: string = 'asset_type'
): Expression | string => {
  const colors = Object.entries(categoryColors(categories, colorScheme)).reduce(
    (expression, [cat, color]) => [...expression, [cat], color] as string[],
    [] as string[]
  );

  if (!colors || !colors.length) {
    return 'black';
  }

  const result = [
    'match' as ExpressionName,
    ['get', field],
    ...colors,
    'hsl(0, 0%, 0%)',
  ] as Expression;

  return result;
};

const categoryColors = (
  categories: string[],
  colorScheme: ColorScheme = ColorScheme.Light
) =>
  categories.reduce(
    (record, category, index) => ({
      ...record,
      [category]:
        colorScheme === 'light'
          ? chroma.brewer.Set1[index]
          : chroma.brewer.Set1[index],
    }),
    {} as Record<string, string>
  );

/**
 * Returns themed map layer and corresponding set of colors for use in overlays.
 *
 * @param availableAssetTypes
 * @param selectedAssetTypes
 * @param {string} colorScheme
 */
// export function getAssetTheme(
//   availableAssetTypes?: AssetType[],
//   selectedAssetTypes?: string[],
//   colorScheme: ColorScheme = ColorScheme.Light
// ) {
//   if (!!selectedAssetTypes && !!selectedAssetTypes.length) {
//     return {
//       assetLayer: makeAssetLayer(selectedAssetTypes, colorScheme),
//       assetLegendItemProps: makeAssetLegendItems(
//         availableAssetTypes,
//         selectedAssetTypes,
//         colorScheme
//       ),
//       assetsOnMap: true,
//     };
//   }
//   return {
//     assetLayer: undefined,
//     assetLegendItemProps: undefined,
//     assetsOnMap: false,
//   };
// }
