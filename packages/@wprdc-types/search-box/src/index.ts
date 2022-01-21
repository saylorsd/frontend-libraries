/**
 *
 * SearchBox types
 *
 **/
import { ComboBoxProps } from '@react-types/combobox';
import { LoadingState } from '@react-types/shared';
import { ListConnectableComponentProps } from '@wprdc-types/shared';
import { Resource } from '@wprdc-types/shared';
import { ListBoxOptions } from '@wprdc-types/list-box';

export interface SearchBoxProps<T> extends ComboBoxProps<T> {
  loadingState?: LoadingState;
  onLoadMore?: () => void;
  children: (item: T) => JSX.Element;
  listBoxProps?: ListBoxOptions<T>;
}

export interface ConnectedSearchBoxProps<
  T extends Resource,
  O extends object = {},
> extends ListConnectableComponentProps<T> {
  label?: string;
  onSelection?: (item: T) => unknown;
  /** Props to pass along to underlying list box */
  listBoxProps?: ListBoxOptions<T, O>;
}
