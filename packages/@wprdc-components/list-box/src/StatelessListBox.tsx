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

import {
  ListBoxSectionAria,
  useListBox,
  useListBoxSection,
  useOption,
} from '@react-aria/listbox';

// todo: get icons
import { RiCheckFill } from 'react-icons/ri';

import {
  ListBoxSectionProps,
  OptionProps,
  StatelessListBoxProps,
} from '@wprdc-types/list-box';
import { Resource } from '@wprdc-types/shared';

export const StatelessListBox = <T extends Resource>(
  props: StatelessListBoxProps<T>,
): JSX.Element => {
  const defaultRef = React.useRef<HTMLUListElement>(null);
  const { listBoxRef = defaultRef, state, dense, optionTemplate } = props;
  const { listBoxProps, labelProps } = useListBox<T>(props, state, listBoxRef);

  const items = Array.from(state.collection);

  return (
    <div className={classNames(styles.wrapper)}>
      <div {...labelProps} className={styles.label}>
        {props.label}
      </div>
      <ul
        {...listBoxProps}
        ref={listBoxRef}
        className={classNames(styles.list, {
          [styles.focused]: state.isFocused,
        })}
      >
        {items.map((item) => {
          if (item.type === 'section') {
            return (
              <ListBoxSection<T>
                key={item.key}
                section={item}
                state={state}
                dense={dense}
                optionTemplate={optionTemplate}
              />
            );
          }
          return (
            <Option<T>
              key={item.key}
              item={item}
              state={state}
              dense={dense}
              Template={optionTemplate}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const ListBoxSection = <T extends Resource, O extends object = {}>({
  section,
  state,
  dense,
  optionTemplate,
}: ListBoxSectionProps<T, O>) => {
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
              !!node && (
                <Option
                  key={node.key}
                  item={node}
                  state={state}
                  dense={dense}
                  Template={optionTemplate}
                />
              ),
          )}
        </ul>
      </li>
    </div>
  );
};

export const Option = <T extends Resource, P extends object = {}>({
  item,
  state,
  dense,
  optionTemplate: Template,
  optionTemplateOptions,
}: OptionProps<T, P>) => {
  const ref = React.useRef<HTMLLIElement>(null);

  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );

  const content = React.useMemo(() => {
    if (!!Template)
      return <Template item={item.value} {...optionTemplateOptions} />;
    return item.rendered;
  }, [item, Template]);

  return (
    <li
      {...optionProps}
      ref={ref}
      className={classNames(styles.option, {
        [styles.optionSelected]: isSelected,
        [styles.optionDisabled]: isDisabled,
        [styles.optionFocused]: isFocused,
        [styles.dense]: dense,
      })}
    >
      <div className="flex-grow">{content}</div>
      <div className="flex items-center">
        {isSelected ? (
          <RiCheckFill className={styles.checkMark} />
        ) : (
          <div className={styles.checkMark} />
        )}
      </div>
    </li>
  );
};
