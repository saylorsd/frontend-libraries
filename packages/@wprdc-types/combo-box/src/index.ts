/**
 *
 * ComboBox types
 *
 **/
import { LoadingState } from '@react-types/shared';
import { ListConnectableComponent } from '@wprdc-types/shared';
import { ComboBoxProps as RTComboBoxProps } from '@react-types/combobox';

export interface ComboBoxProps<T extends object>
  extends RTComboBoxProps<T>,
    ListConnectableComponent<T> {
  loadingState?: LoadingState;
  onLoadMore?: () => void;
}
