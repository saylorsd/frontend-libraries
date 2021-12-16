/**
 *
 * MiniMap
 *
 */
import * as React from 'react';
import '../../styles/global.css';

import { ColorScheme } from '@wprdc-types/shared';

import { useProvider } from '@wprdc-components/provider';
import { VizProps, MiniMapViz, MiniMapOptions } from '@wprdc-types/viz';

import { PopupContentProps, LayerPanelVariant } from '@wprdc-types/geo';

import styles from './MiniMap.module.css';

interface Props extends VizProps<MiniMapViz, null, MiniMapOptions> {}

export function MiniMap(props: Props) {
  const { dataViz } = props;
  const { options, error } = dataViz;

  const context = useProvider();
  const { mapboxAPIToken } = context || { mapboxAPIToken: null };

  if (error) {
    console.error(error);
  }

  if (!options) return <div />;
  const { sources, layers, mapOptions, legends } = options;

  function PopupContent({ primaryFeatureProps }: PopupContentProps) {
    if (primaryFeatureProps) {
      const {
        geo_name: name,
        value,
        number_format_options: numberFormatOptionsString,
      } = primaryFeatureProps;

      const numberFormatOptions = JSON.parse(numberFormatOptionsString);

      let displayValue = value;
      if (typeof value === 'number') {
        displayValue = value.toLocaleString('en-US', numberFormatOptions);
      }

      return (
        <div className={styles.popup}>
          {name}: <strong>{displayValue}</strong>
        </div>
      );
    }
    return <></>;
  }

  return (
    <Map
      mapboxApiAccessToken={mapboxAPIToken}
      defaultViewport={{ zoom: 8, longitude: -79.9925 }}
      layerPanelVariant={LayerPanelVariant.None}
      CustomHoverContents={PopupContent}
      legendItems={legends}
      sources={sources}
      layers={layers}
      getCursor={() => 'crosshair'}
      basemapStyle={ColorScheme.Light}
      hideLegendTitle
      {...mapOptions}
    />
  );
}
