/**
 *
 * SearchBox types
 *
 **/
import { ComboBoxProps } from '@react-types/combobox';
import { LoadingState } from '@react-types/shared';
import { AsyncListLoadFunction, AsyncListOptions } from '@react-stately/data';

export interface SearchBoxProps<T> extends ComboBoxProps<T> {
  loadingState?: LoadingState;
  onLoadMore?: () => void;
}

// T = Type, C = cursor, K = key
export interface SearchBoxConnection<T, C = string>
  extends AsyncListOptions<T, C> {
  load: AsyncListLoadFunction<T, C>;

  /** Function that describes how to render each item. */
  renderItem: (item: T) => JSX.Element;
}
