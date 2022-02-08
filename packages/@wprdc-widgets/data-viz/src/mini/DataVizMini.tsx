/**
 *
 * DataVizPreview
 *
 */
import React, { memo } from 'react';

import '../main.css';
import styles from './DataVizMini.module.css';

import Measure from 'react-measure';
import { DataVizMiniProps } from '@wprdc-types/data-viz';
import { Message } from '../message';
import { DataVizMiniSkeleton } from './DataVizMiniSkeleton';

export const DataVizMini = memo((props: DataVizMiniProps) => {
  const { dataViz, geog, colorScheme, Visualization, isLoading, error } = props;

  /* Keep track fo dimensions to send to vega charts */
  const [{ width, height }, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  if (isLoading) {
    return <DataVizMiniSkeleton />;
  }

  return (
    <div className="relative">
      <Measure
        bounds
        onResize={(contentRect) => {
          if (contentRect.bounds) setDimensions(contentRect.bounds);
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            <div
              className={styles.vizDiv}
              aria-label="data presentation preview"
            >
              {!!error && <Message error={error.message} />}
              {!error && !!Visualization && !!dataViz && !!geog && (
                <Visualization
                  dataViz={dataViz}
                  geog={geog}
                  colorScheme={colorScheme}
                  vizHeight={height - 15}
                  vizWidth={width - 35}
                />
              )}
            </div>
          </div>
        )}
      </Measure>
    </div>
  );
});
