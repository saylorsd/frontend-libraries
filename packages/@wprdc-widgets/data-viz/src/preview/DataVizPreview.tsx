/**
 *
 * DataVizPreview
 *
 */
import React, { memo } from 'react';

import '../main.css';
import styles from './DataVizPreview.module.css';

import Measure from 'react-measure';
import { DataVizPreviewProps } from '@wprdc-types/data-viz';
import { Message } from '../message';
import { LoadingMessage } from '@wprdc-components/loading-message';

export const DataVizPreview = memo((props: DataVizPreviewProps) => {
  const { dataViz, geog, colorScheme, Visualization, isLoading, error } = props;

  /* Keep track fo dimensions to send to vega charts */
  const [{ width, height }, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  return (
    <div className={styles.container}>
      <Measure
        bounds
        onResize={(contentRect) => {
          if (contentRect.bounds) setDimensions(contentRect.bounds);
        }}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className={styles.wrapper}
            aria-label="data presentation preview"
          >
            {isLoading && <LoadingMessage name="preview" />}
            {!!error && <Message error={error.message} />}
            {!!Visualization && !!dataViz && !!geog && (
              <Visualization
                inPreview
                dataViz={dataViz}
                geog={geog}
                colorScheme={colorScheme}
                vizHeight={height - 15}
                vizWidth={width - 35}
              />
            )}
          </div>
        )}
      </Measure>
    </div>
  );
});
