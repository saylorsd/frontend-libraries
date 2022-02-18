/**
 *
 * Select types
 *
 **/
import { AriaSelectProps } from '@react-types/select';
import { ListBoxOptions } from '@wprdc-types/list-box';
import { ListConnectableComponentProps, Resource } from '@wprdc-types/shared';
import { Key } from 'react';

export interface SelectProps<T, O extends object = {}>
  extends AriaSelectProps<T> {
  /** Function run when an item is selected */
  onSelection?: {
    (item: T): void;
    (item: Key): void;
  };
  /** Props to pass along to underlying list box */
  listBoxProps?: ListBoxOptions<T, O>;
}

export interface ConnectedSelectProps<T extends Resource, O extends object = {}>
  extends ListConnectableComponentProps<T>,
    Omit<SelectProps<T, O>, 'children'> {
  label?: string;
  /** Function run when an item is selected */
  onSelection?: {
    (item: T): void;
    (item: Key): void;
  } /** Props to pass along to underlying list box */;
  listBoxProps?: ListBoxOptions<T, O>;
}
