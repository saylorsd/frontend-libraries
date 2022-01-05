/**
 *
 * CheckboxGroup
 *
 * A group of checkboxes
 *
 */
import * as React from 'react';
import './main.css';
import styles from './CheckboxGroup.module.css';

import {
  CheckboxGroupState,
  useCheckboxGroupState,
} from '@react-stately/checkbox';

import { useCheckboxGroup, useCheckboxGroupItem } from '@react-aria/checkbox';

import { CheckboxGroupProps, CheckboxProps } from '@wprdc-types/checkbox-group';

const CheckboxGroupContext = React.createContext<CheckboxGroupState | null>(
  null,
);

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { children, label, items } = props;
  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps } = useCheckboxGroup(props, state);

  return (
    <div {...groupProps} className={styles.container}>
      <span {...labelProps} className={styles.label}>
        {label}
      </span>
      <CheckboxGroupContext.Provider value={state}>
        <div className={styles.itemsWrapper}>
          {children || (items && items.map((item) => <Checkbox {...item} />))}
        </div>
      </CheckboxGroupContext.Provider>
    </div>
  );
}

export function Checkbox(props: CheckboxProps) {
  const { children, label } = props;
  const state = React.useContext(CheckboxGroupContext) as CheckboxGroupState;
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckboxGroupItem(props, state, ref);

  const isDisabled = state.isDisabled || props.isDisabled;
  const isSelected = state.isSelected(props.value);

  return (
    <label
      style={{
        display: 'block',
        color: (isDisabled && 'gray') || (isSelected && 'blue') || undefined,
      }}
      className={styles.itemLabel}
    >
      <input {...inputProps} ref={ref} className={styles.input} />
      {children || label}
    </label>
  );
}

export default CheckboxGroup;
