/**
 *
 * MiniMap
 *
 */
import * as React from 'react';
import './main.css';

import { Map } from '@wprdc-widgets/map';

import { PopupContentProps, LayerPanelVariant } from '@wprdc-types/map';
import { MiniMapVizProps } from '@wprdc-types/viz';

import styles from './MiniMap.module.css';

export function MiniMap(props: MiniMapVizProps) {
  const { dataViz } = props;
  const { options, error } = dataViz;

  if (!!error && !!error.level) {
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
      defaultViewport={{ zoom: 9, longitude: -79.9925 }}
      layerPanelVariant={LayerPanelVariant.None}
      CustomHoverContents={PopupContent}
      legendItems={legends}
      sources={sources}
      layers={layers}
      getCursor={() => 'crosshair'}
      hideLegendTitle
      {...mapOptions}
    />
  );
}
