import * as React from 'react';
import { useEffect } from 'react';
import { Meta } from '@storybook/react';

import { ConnectedDataViz } from '../packages/@wprdc-widgets/data-viz';
import { DataVizID } from '../packages/@wprdc-types/viz';
import { GeogBrief, GeographyType } from '../packages/@wprdc-types/geo';
import { DataVizVariant } from '../packages/@wprdc-types/data-viz';
import { useGeography } from '../packages/@wprdc-connections/geo';
import { useProvider } from '../packages/@wprdc-components/provider';
import { ConnectedSearchBox } from '../packages/@wprdc-components/search-box';
import { dataVizConnection } from '../packages/@wprdc-connections/viz';
import { GeographyPicker } from '../packages/@wprdc-widgets/geography-picker';
import { Divider } from '../packages/@wprdc-components/divider';
import { defaultVizListBoxProps } from '../packages/@wprdc-connections/viz/src';

export default {
  title: 'Tools/Data Viz Viewer',
  component: ConnectedDataViz,
} as Meta;

export const WithSearch = () => {
  const context = useProvider();

  const [dataVizSlug, setDataVizSlug] = React.useState<string>(
    'total-population-bv',
  );
  const [geogBrief, setGeogBrief] = React.useState<GeogBrief>(DEFAULT_GEOG);

  const { geog } = useGeography(geogBrief);

  useEffect(() => {
    if (!!geog) context.setGeog(geog);
  }, [geog]);

  function handleSelection(dataViz: DataVizID) {
    if (!!dataViz) setDataVizSlug(dataViz.slug);
  }

  return (
    <>
      <ConnectedSearchBox
        connection={dataVizConnection}
        label="Find your data viz"
        onSelection={handleSelection}
        listBoxProps={defaultVizListBoxProps}
      />
      <br />
      <br />

      <GeographyPicker selectedGeog={geog} onSelection={setGeogBrief} />
      <br />
      <br />
      <Divider weight="thick" />
      <ConnectedDataViz
        variant={DataVizVariant.Details}
        dataVizSlug={dataVizSlug}
        geog={geog}
      />
    </>
  );
};

const DEFAULT_GEOG: GeogBrief = {
  id: 104,
  slug: 'county-42003',
  name: 'Allegheny',
  title: 'Allegheny',
  geogType: GeographyType.County,
  geogID: '42003',
};
