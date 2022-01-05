/**
 *
 * ComboBox types
 *
 **/
import { Resource, ListConnectableComponentProps } from '@wprdc-types/shared';
import { ComboBoxProps as RTComboBoxProps } from '@react-types/combobox';

export interface ComboBoxProps<T extends Resource = Resource>
  extends RTComboBoxProps<T>,
    ListConnectableComponentProps<T> {}
