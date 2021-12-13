import React from 'react';
import { Radio, RadioGroup } from '.';

export default {
  title: 'RadioGroup',
  component: RadioGroup,
};

export const Default = () => (
  <RadioGroup label="Favorite pet">
    <Radio value="dogs">Dogs</Radio>
    <Radio value="cats">Cats</Radio>
  </RadioGroup>
);
