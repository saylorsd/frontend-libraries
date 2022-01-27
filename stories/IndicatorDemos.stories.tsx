import React, { useEffect } from 'react';
import { Story } from '@storybook/react';

import { IndicatorView } from '../packages/@wprdc-widgets/indicator-view';
import { GeographyType } from '../packages/@wprdc-types/geo';
import { Indicator } from '../packages/@wprdc-types/profiles';
import { ConnectedIndicatorViewProps } from '../packages/@wprdc-types/indicator-view';
import { useProvider } from '../packages/@wprdc-components/provider';
import { ConnectedIndicatorView } from '../packages/@wprdc-widgets/indicator-view';
import { useGeography } from '../packages/@wprdc-connections/geo';
import { GeogBrief } from '../packages/@wprdc-types/geo';
import { ConnectedSearchBox } from '../packages/@wprdc-components/search-box';
import {
  indicatorConnection,
  defaultIndicatorListBoxProps,
} from '../packages/@wprdc-connections/profiles';
import { Divider } from '../packages/@wprdc-components/divider';

export default {
  title: 'Tools/Indicator Viewer',
  component: IndicatorView,
};

const DEFAULT_GEOG: GeogBrief = {
  id: 104,
  slug: 'county-42003',
  name: 'Allegheny',
  title: 'Allegheny',
  geogType: GeographyType.County,
  geogID: '42003',
};

const ConnectedTemplate: Story<ConnectedIndicatorViewProps> = (args) => {
  const context = useProvider();
  const [indicatorSlug, setIndicatorSlug] =
    React.useState<string>('total-population');
  const [geogBrief, setGeogBrief] = React.useState<GeogBrief>(DEFAULT_GEOG);

  const { geog } = useGeography(geogBrief);

  useEffect(() => {
    if (!!geog) context.setGeog(geog);
  }, [geog]);

  function handleSelection(indicator: Indicator) {
    if (!!indicator) setIndicatorSlug(indicator.slug);
  }

  return (
    <>
      <ConnectedSearchBox
        connection={indicatorConnection}
        label="Pick your indicator"
        onSelection={handleSelection}
        listBoxProps={defaultIndicatorListBoxProps}
      />
      <br />
      <br />
      <Divider weight="thick" />

      <ConnectedIndicatorView
        {...args}
        indicatorSlug={indicatorSlug}
        onGeogSelection={setGeogBrief}
      />
    </>
  );
};

export const withSearch = ConnectedTemplate.bind({});
withSearch.args = {};
