import * as React from 'react';

import { ConnectedIndicatorViewProps } from '@wprdc-types/indicator-view';

import ErrorMessage from '@wprdc-components/error-message';
import { useProvider } from '@wprdc-components/provider';

import { useIndicator } from '@wprdc-connections/profiles';

import { IndicatorView } from './IndicatorView';

export const ConnectedIndicatorView: React.FC<ConnectedIndicatorViewProps> = ({
  indicatorSlug,
  geog: propsGeog,
  ...otherProps
}) => {
  const { geog } = useProvider();
  const usedGeog = React.useMemo(() => propsGeog || geog, [geog, propsGeog]);
  const { indicator, isLoading, error } = useIndicator(indicatorSlug);

  if (!!error) {
    return <ErrorMessage title={`Not Found`} message={error} />;
  }
  if (!!indicator) {
    return (
      <IndicatorView
        indicator={indicator}
        geog={usedGeog}
        isLoading={isLoading}
        {...otherProps}
      />
    );
  }
  return <div />;
};
