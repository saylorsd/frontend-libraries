import React, { useState } from 'react';
import { GeographyPicker } from '../packages/@wprdc-widgets/geography-picker';
import { Story } from '@storybook/react';
import { GeographyPickerProps } from '../packages/@wprdc-types/geography-picker';
import { GeogBrief } from '../packages/@wprdc-types/geo';

export default {
  title: 'GeographyPicker',
  component: GeographyPicker,
};

const Template: Story<GeographyPickerProps> = (args) => {
  const [geog, setGeog] = useState<GeogBrief>();
  return (
    <div className="w-64">
      <GeographyPicker {...args} onSelection={setGeog} />
      {geog && (
        <div className="mt-3 p-1 border">
          <pre>{JSON.stringify(geog, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
