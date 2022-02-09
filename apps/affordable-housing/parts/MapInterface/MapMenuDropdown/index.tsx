/**
 *
 * MapMenuDropdown
 *
 */
import * as React from 'react';
import { Item, Select, SelectProps } from '@wprdc/toolkit';

interface Props<T> extends Omit<SelectProps<T>, 'children'> {}

export function MapMenuDropdown<T extends object>(props: Props<T>) {
  return (
    <Select<T> {...props}>
      <Item>test</Item>
    </Select>
  );
}
