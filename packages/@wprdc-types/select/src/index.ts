/**
 *
 * Select types
 *
 **/

import { AriaSelectProps } from '@react-types/select';
import { ListBoxOptions } from '@wprdc-types/list-box';

export interface SelectProps<T, P = {}> extends AriaSelectProps<T> {
  /** Function run when an item is selected */
  onSelection?: (item: T) => unknown;
  /** Props to pass along to underlying list box */
  listBoxProps?: ListBoxOptions<T, P>;
}
