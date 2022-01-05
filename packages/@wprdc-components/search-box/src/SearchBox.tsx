/**
 *
 * SearchBox
 *
 * Search for items, all in one box!
 *
 */
import * as React from 'react';
import './main.css';
import styles from './SearchBox.module.css';

import { useComboBoxState } from '@react-stately/combobox';
import { useSearchFieldState } from '@react-stately/searchfield';

import { useComboBox } from '@react-aria/combobox';
import { useFilter } from '@react-aria/i18n';
import { useButton } from '@react-aria/button';
import { useSearchField } from '@react-aria/searchfield';

//todo: get icons
// import { RiCloseLine, RiSearchLine } from 'react-icons/ri';

import { Popover } from '@wprdc-components/popover';
import { StatelessListBox } from '@wprdc-components/list-box';
import { SearchBoxProps } from '@wprdc-types/search-box';
import { Resource } from '@wprdc-types/shared';

import classNames from 'classnames';

export function SearchBox<T extends Resource>(props: SearchBoxProps<T>) {
  const { loadingState } = props;
  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const listBoxRef = React.useRef<HTMLUListElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const clearButtonRef = React.useRef<HTMLButtonElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef,
      buttonRef,
    },
    state,
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(
    loadingState === 'loading',
  );

  // Get props for the clear button from useSearchField
  const searchProps = {
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v),
  };

  const searchState = useSearchFieldState(searchProps);
  const { clearButtonProps } = useSearchField(
    searchProps,
    searchState,
    inputRef,
  );
  const { buttonProps } = useButton(clearButtonProps, clearButtonRef);

  /*
   * Switch boolean loading state based on categorical loading state.
   * States that don't affect the switch are 'sorting', 'loadingMore' and 'filtering'
   */
  React.useEffect(() => {
    if (!props.loadingState) setIsLoading(false);
    else if (
      ['filtering', 'loading', 'loadingMore'].includes(props.loadingState)
    ) {
      setIsLoading(true);
    } else if (['error', 'idle'].includes(props.loadingState)) {
      setIsLoading(false);
    }
  }, [props.loadingState]);

  return (
    <div className={styles.container}>
      {props.label && (
        <label {...labelProps} className={styles.label}>
          {props.label}
        </label>
      )}
      <div
        className={classNames(styles.box, {
          [styles.focusedBox]: state.isFocused,
        })}
      >
        {/*<RiSearchLine aria-hidden="true" className="w-5 h-5 text-gray-500" />*/}
        <input {...inputProps} ref={inputRef} className={styles.realInput} />
        <button
          {...buttonProps}
          ref={clearButtonRef}
          style={{ visibility: state.inputValue !== '' ? 'visible' : 'hidden' }}
          className={styles.button}
        >
          {/*<RiCloseLine aria-hidden="true" className="w-4 h-4" />*/}
        </button>
      </div>

      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <StatelessListBox<T>
            fullWidth
            listBoxRef={listBoxRef}
            {...listBoxProps}
            state={state}
            isLoading={isLoading}
          />
        </Popover>
      )}
    </div>
  );
}

export default SearchBox;
