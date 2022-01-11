/**
 *
 * DataVizDetails
 *
 */
import React from 'react';
import classnames from 'classnames';

import Measure from 'react-measure';
import { SourceList } from '@wprdc-components/source-list';
import { LoadingMessage } from '@wprdc-components/loading-message';
import { DataVizDetailsProps } from '@wprdc-types/data-viz';
import { Heading } from '@wprdc-components/heading';
import { DataVizType } from '@wprdc-types/shared';

import { Message } from '../message';

export function DataVizDetails(props: DataVizDetailsProps) {
  const {
    dataViz,
    geog,
    colorScheme,
    CurrentViz,
    isLoading,
    error,
    headingLevel = 3,
  } = props;
  const { name, description } = dataViz || {};
  /* Keep track fo dimensions to send to vega charts */
  const [{ width, height }, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  return (
    <div className="relative">
      <div className="">
        <div>
          <Heading level={headingLevel} className="text-4xl font-bold">
            {name}
          </Heading>
          <p className="text-lg my-1 pt-0.5 pb-1 border-b">{description}</p>
        </div>
      </div>
      <Measure
        bounds
        onResize={(contentRect) => {
          if (contentRect.bounds) setDimensions(contentRect.bounds);
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            <div
              className={classnames('p-2', {
                'h-80': dataViz?.vizType === DataVizType.Chart,
              })}
              aria-label="data presentation"
            >
              {!!error && <Message error={error} />}
              {isLoading && <LoadingMessage name={dataViz && dataViz.name} />}
              {!isLoading && !!CurrentViz && !!dataViz && !!geog && (
                <CurrentViz
                  dataViz={dataViz}
                  geog={geog}
                  colorScheme={colorScheme}
                  vizHeight={height - 15}
                  vizWidth={width - 15}
                />
              )}
            </div>
          </div>
        )}
      </Measure>
      <div className="pl-1.5 py-0">
        {!!dataViz && !!dataViz.sources && (
          <SourceList sources={dataViz.sources} />
        )}
      </div>
    </div>
  );
}
