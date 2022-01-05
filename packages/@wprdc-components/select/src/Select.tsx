import * as React from 'react';
import './main.css';

import styles from './Select.module.css';

import classnames from 'classnames';

import { HiddenSelect, useSelect } from '@react-aria/select';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { useButton } from '@react-aria/button';
import { AriaListBoxOptions } from '@react-aria/listbox';

import { useSelectState } from '@react-stately/select';

import { Popover } from '@wprdc-components/popover';
import { StatelessListBox } from '@wprdc-components/list-box';

import { SelectProps } from '@wprdc-types/select';
import { Resource } from '@wprdc-types/shared';

// todo: get icons
import { HiSelector } from 'react-icons/hi';

export function Select<T extends Resource>(props: SelectProps<T>) {
  // Create state based on the incoming props
  const { onSelection } = props;
  const selectionShim = (key: React.Key) => {
    if (!!onSelection) {
      onSelection(state.collection.getItem(key).value);
    }
  };

  const listBoxRef = React.useRef<HTMLUListElement>(null);

  const onSelectionChange = props.onSelectionChange || selectionShim;
  let state = useSelectState({ ...props, onSelectionChange });

  // Get props for child elements from useSelect
  let ref = React.useRef(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref,
  );

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref);

  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div className={styles.container}>
      {props.label && (
        <div {...labelProps} className={styles.label}>
          {props.label}
        </div>
      )}
      <HiddenSelect<T>
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={classnames(styles.button, {
          [styles.focusVis]: isFocusVisible,
        })}
      >
        <span
          className={classnames(styles.value, {
            [styles.selected]: !!state.selectedItem,
          })}
          {...valueProps}
        >
          {state.selectedItem
            ? state.selectedItem.rendered
            : 'Select an option'}
        </span>
        <HiSelector
          className={classnames(styles.icon, {
            [styles.focusVis]: isFocusVisible,
          })}
        />
      </button>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <StatelessListBox<T>
            fullWidth
            listBoxRef={listBoxRef}
            {...(menuProps as AriaListBoxOptions<T>)}
            state={state}
          />
        </Popover>
      )}
    </div>
  );
}

export default Select;
