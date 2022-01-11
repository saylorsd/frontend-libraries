/**
 *
 * DataVizPreview
 *
 */
import React, { memo } from 'react';
import Measure from 'react-measure';
import { DataVizMiniProps } from '@wprdc-types/data-viz';
import { Message } from '../message';

export const DataVizMini = memo((props: DataVizMiniProps) => {
  const { dataViz, geog, colorScheme, CurrentViz, isLoading, error } = props;

  /* Keep track fo dimensions to send to vega charts */
  const [{ width, height }, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });
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
              className="rounded"
              aria-label="data presentation preview"
              style={{ maxWidth: !!error ? 'size-3000' : undefined }}
            >
              {!!error && <Message error={error} />}
              {isLoading && <div className="">Loading...</div>}
              {!error && !!CurrentViz && !!dataViz && !!geog && (
                <CurrentViz
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
