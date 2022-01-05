/**
 *
 * SearchBox types
 *
 **/
import { ComboBoxProps } from '@react-types/combobox';
import { LoadingState } from '@react-types/shared';
import { ListConnectableComponentProps } from '@wprdc-types/shared';
import { Resource } from '@wprdc-types/shared';

export interface SearchBoxProps<T> extends ComboBoxProps<T> {
  loadingState?: LoadingState;
  onLoadMore?: () => void;
  children: (item: T) => JSX.Element;
}

export interface ConnectedSearchBoxProps<T extends Resource>
  extends ListConnectableComponentProps<T> {
  label?: string;
  onSelection?: (item: T) => unknown;
}
