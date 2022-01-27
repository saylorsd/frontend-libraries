import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import {
  ConnectedDataViz,
  DataVizCardSkeleton,
  DataVizMiniSkeleton,
} from '../packages/@wprdc-widgets/data-viz';
import { DataVizID } from '../packages/@wprdc-types/viz';
import { DataVizType } from '../packages/@wprdc-types/shared';
import { GeogBrief, GeographyType } from '../packages/@wprdc-types/geo';
import {
  ConnectedDataVizProps,
  DataVizVariant,
} from '../packages/@wprdc-types/data-viz';
import { useGeography } from '../packages/@wprdc-connections/geo';
import { useProvider } from '../packages/@wprdc-components/provider';
import { useEffect } from 'react';
import { ConnectedSearchBox } from '../packages/@wprdc-components/search-box';
import { dataVizConnection } from '../packages/@wprdc-connections/viz';
import { GeographyPicker } from '../packages/@wprdc-widgets/geography-picker';
import { Divider } from '../packages/@wprdc-components/divider';
import { defaultVizListBoxProps } from '../packages/@wprdc-connections/viz/src';

export default {
  title: 'Components/Data Viz',
  component: ConnectedDataViz,
} as Meta;

const bigValue: DataVizID = {
  id: 38,
  name: 'Total Population',
  slug: 'total-population-bv',
  vizType: DataVizType.BigValue,
};

const miniMap: DataVizID = {
  id: 58,
  name: 'Population Under 18',
  slug: 'pop-under18-map',
  vizType: DataVizType.MiniMap,
  description: 'Count and percentage of population ages 0 - 17',
};

const table: DataVizID = {
  id: 16,
  name: 'Population by Race',
  slug: 'pop-by-race',
  vizType: DataVizType.Table,
  description: '',
};

const geog: GeogBrief = {
  id: 0,
  slug: 'county-42003',
  name: 'Allegheny',
  title: 'Allegheny',
  geogType: GeographyType.County,
  geogID: '42003',
};

const Template: Story<ConnectedDataVizProps> = (args) => (
  <ConnectedDataViz {...args} />
);

export const Card = Template.bind({});
export const CardSkeleton = () => <DataVizCardSkeleton />;

export const Preview = Template.bind({});

export const Blurb = Template.bind({});
export const BlurbSkeleton = () => <DataVizMiniSkeleton />;

export const Details = Template.bind({});

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

Card.args = {
  dataVizSlug: miniMap.slug,
  geog: geog,
  showGeog: true,
  variant: DataVizVariant.Default,
};

Preview.args = {
  dataVizSlug: table.slug,
  geog: geog,
  variant: DataVizVariant.Preview,
};

Blurb.args = {
  dataVizSlug: bigValue.slug,
  geog: geog,
  variant: DataVizVariant.Blurb,
};

Details.args = {
  dataVizSlug: miniMap.slug,
  geog: geog,
  variant: DataVizVariant.Details,
};

const DEFAULT_GEOG: GeogBrief = {
  id: 104,
  slug: 'county-42003',
  name: 'Allegheny',
  title: 'Allegheny',
  geogType: GeographyType.County,
  geogID: '42003',
};
