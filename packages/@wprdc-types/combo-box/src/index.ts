/**
 *
 * ComboBox types
 *
 **/
import { AsyncListLoadFunction, AsyncListOptions } from '@react-stately/data';
import { LoadingState } from '@react-types/shared';
import { ComboBoxProps as RTComboBoxProps } from '@react-types/combobox';

export interface ComboBoxProps<T> extends RTComboBoxProps<T> {
  loadingState?: LoadingState;
  onLoadMore?: () => void;
}

export interface ComboBoxConnection<T, C = string>
  extends AsyncListOptions<T, C> {
  load: AsyncListLoadFunction<T, C>;
  /** Function that describes how to render each item. */
  renderItem: (item: T) => JSX.Element;
}
