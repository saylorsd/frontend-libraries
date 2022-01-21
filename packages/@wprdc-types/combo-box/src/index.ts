/**
 *
 * ComboBox types
 *
 **/
import { Resource, ListConnectableComponentProps } from '@wprdc-types/shared';
import { ComboBoxProps as RTComboBoxProps } from '@react-types/combobox';
import { ListBoxOptions } from '@wprdc-types/list-box';

export interface ComboBoxProps<T extends Resource = Resource>
  extends RTComboBoxProps<T>,
    ListConnectableComponentProps<T> {
  /** Props to pass along to underlying list box */
  listBoxProps: ListBoxOptions<T>;
}
