/**
 *
 * ComboBox types
 *
 **/
import { Resource } from '@wprdc-types/shared';
import { ComboBoxProps as RTComboBoxProps } from '@react-types/combobox';
import { ListBoxOptions } from '@wprdc-types/list-box';

export interface ComboBoxProps<T extends Resource, O extends object = {}>
  extends RTComboBoxProps<T> {
  /** Props to pass along to underlying list box */
  listBoxProps?: ListBoxOptions<T, O>;
}
