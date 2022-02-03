import * as React from 'react';
import { DataViz } from './DataViz';
import { ConnectedDataVizProps, DataVizVariant } from '@wprdc-types/data-viz';
import { ErrorMessage } from '@wprdc-components/error-message';
import { useProvider } from '@wprdc-components/provider';
import { useDataViz } from '@wprdc-connections/viz';
import classNames from 'classnames';
import styles from './DataViz.module.css';
import { LoadingMessage } from '@wprdc-components/loading-message';

export const ConnectedDataViz: React.FC<ConnectedDataVizProps> = ({
  dataVizSlug,
  showGeog,
  geog: propsGeog,
  variant,
  onExplore,
}) => {
  const { geog } = useProvider();
  const usedGeog = React.useMemo(() => propsGeog || geog, [geog, propsGeog]);
  const { dataViz, isLoading, error } = useDataViz(
    dataVizSlug,
    usedGeog && usedGeog.slug
  );

  let errorContent = null;
  if (!!error && !!error.level) {
    errorContent = (
      <ErrorMessage
        variant="centered"
        title={error.status}
        message={`${error.message}`}
      />
    );
  }

  if (!usedGeog) {
    errorContent = (
      <ErrorMessage title="Error" message="No Geography Provided" />
    );
  }

  if (!!errorContent || isLoading)
    return (
      <div
        className={classNames({
          [styles.errorPreviewWrapper]: variant === DataVizVariant.Preview,
        })}
      >
        {isLoading ? (
          <LoadingMessage message="Loading data viz" />
        ) : (
          errorContent
        )}
      </div>
    );

  return (
    <DataViz
      dataViz={dataViz}
      geog={usedGeog}
      showGeog={showGeog}
      isLoading={isLoading}
      error={error}
      variant={variant}
      onExplore={onExplore}
    />
  );
};
