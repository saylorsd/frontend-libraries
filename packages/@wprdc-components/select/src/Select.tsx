import * as React from 'react';

import { HiddenSelect, useSelect } from '@react-aria/select';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import { useButton } from '@react-aria/button';
import { AriaListBoxOptions } from '@react-aria/listbox';

import { useSelectState } from '@react-stately/select';

import { Popover } from '@wprdc-components/popover';
import { StatelessListBox } from '@wprdc-components/list-box';

import { SelectProps } from '@wprdc-types/select';

// todo: get icons
// import { HiSelector } from 'react-icons/hi';

export function Select<T extends object>(props: SelectProps<T>) {
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
    <div className="inline-flex flex-col relative w-full space-x-0">
      {props.label && (
        <div
          {...labelProps}
          className="block text-sm font-medium text-gray-700 text-left cursor-default"
        >
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
        className={`p-1 pl-3 py-1 relative inline-flex flex-row items-center 
        justify-between rounded-md overflow-hidden cursor-default
         shadow-sm border-2 outline-none ${
           isFocusVisible ? 'border-pink-500' : 'border-gray-300'
         } ${state.isOpen ? 'bg-gray-100' : 'bg-white'}`}
      >
        <span
          {...valueProps}
          className={`text-md ${
            state.selectedItem ? 'text-gray-800' : 'text-gray-500'
          }`}
        >
          {state.selectedItem
            ? state.selectedItem.rendered
            : 'Select an option'}
        </span>
        {/*<HiSelector*/}
        {/*  className={`w-5 h-5 ${*/}
        {/*    isFocusVisible ? 'text-pink-500' : 'text-gray-500'*/}
        {/*  }`}*/}
        {/*/>*/}
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
