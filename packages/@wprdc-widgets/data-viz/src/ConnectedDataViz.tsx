import * as React from 'react';
import { DataViz } from './DataViz';
import { ConnectedDataVizProps } from '@wprdc-types/data-viz';
import { ErrorMessage } from '@wprdc-components/error-message';
import { useProvider } from '@wprdc-components/provider';
import { useDataViz } from '@wprdc-connections/viz';

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

  if (!!error) {
    return <ErrorMessage title={`Not Found`} message={`${error}`} />;
  }

  if (!usedGeog) {
    return <ErrorMessage title="Error" message="No Geography Provided" />;
  }

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
