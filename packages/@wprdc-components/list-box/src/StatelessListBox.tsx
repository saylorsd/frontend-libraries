/**
 *
 * ListBox
 *
 * ...it's a list in a box, baby.
 *
 */
import React from 'react';

import './main.css';
import styles from './ListBox.module.css';

import classNames from 'classnames';

import { useSeparator } from '@react-aria/separator';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import {
  ListBoxSectionAria,
  useListBox,
  useListBoxSection,
  useOption,
} from '@react-aria/listbox';

// import { RiCheckFill } from 'react-icons/ri';

import {
  ListBoxSectionProps,
  OptionProps,
  StatelessListBoxProps,
} from '@wprdc-types/list-box';

export const StatelessListBox = <T extends object>(
  props: StatelessListBoxProps<T>,
): JSX.Element => {
  const { listBoxRef, state, fullWidth, isLoading } = props;
  const { listBoxProps, labelProps } = useListBox<T>(props, state, listBoxRef);

  const layerItems = Array.from(state.collection);
  return (
    <div
      className={classNames([
        styles.container,
        fullWidth ? 'w-full' : 'w-max max-w-96',
      ])}
    >
      <div {...labelProps} className={styles.label}>
        {props.label}
      </div>
      {isLoading && (
        <div className={styles.loadingMessage}>
          {props.loadingMessage || 'Loading...'}
        </div>
      )}
      <ul
        {...listBoxProps}
        ref={listBoxRef}
        className={classNames(styles.list, { [styles.listHidden]: isLoading })}
      >
        {layerItems.map((item) => {
          if (item.type === 'section') {
            return (
              <ListBoxSection<T> key={item.key} section={item} state={state} />
            );
          }
          return <Option<T> key={item.key} item={item} state={state} />;
        })}
      </ul>
    </div>
  );
};

export const ListBoxSection = <T extends object>({
  section,
  state,
}: ListBoxSectionProps<T>) => {
  const { itemProps, headingProps, groupProps }: ListBoxSectionAria =
    useListBoxSection({
      heading: section.rendered,
      'aria-label': section['aria-label'],
    });

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  const nodes = Array.from(section.childNodes);

  return (
    <div className={styles.section}>
      {section.key !== state.collection.getFirstKey() && (
        <li {...separatorProps} className={styles.separator} />
      )}
      <li {...itemProps} className={styles.sectionListItem}>
        {section.rendered && (
          <span {...headingProps} className={styles.sectionHeading}>
            {section.rendered}
          </span>
        )}
        <ul {...groupProps} className={styles.optionList}>
          {nodes.map(
            (node) =>
              !!node && <Option key={node.key} item={node} state={state} />,
          )}
        </ul>
      </li>
    </div>
  );
};

export const Option = <T extends object>({ item, state }: OptionProps<T>) => {
  // Get props for the option element
  const ref = React.useRef<HTMLLIElement>(null);
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);

  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
    },
    state,
    ref,
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  // get class name suffix for state-specific styles
  let stateStyle;
  if (isDisabled) {
    stateStyle = 'disabled';
  } else if (isSelected) {
    stateStyle = 'selected';
  } else if (isFocusVisible) {
    stateStyle = 'focused';
  } else {
    stateStyle = '';
  }

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      className={classNames([styles.option, styles[`option-${stateStyle}`]])}
    >
      <div className="flex-grow">{item.rendered}</div>
      <div className="flex layerItems-center">
        <div className="w-5 ml-2" />
      </div>
    </li>
  );
};
