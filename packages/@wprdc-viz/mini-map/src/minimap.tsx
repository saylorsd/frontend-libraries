/**
 *
 * MiniMap
 *
 */
import * as React from 'react';
import './main.css';

import { useProvider } from '@wprdc-components/provider';
import { Map } from '@wprdc-components/map';

import { PopupContentProps, LayerPanelVariant } from '@wprdc-types/map';
import { ColorScheme } from '@wprdc-types/shared';
import { MiniMapVizProps } from '@wprdc-types/viz';

import styles from './MiniMap.module.css';

export function MiniMap(props: MiniMapVizProps) {
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
