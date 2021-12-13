/**
 *
 * Tabs
 *
 * Tab list
 *
 */
import * as React from 'react';

import './main.css';
import styles from './Tabs.module.css';

import classNames from 'classnames';

import { useTab, useTabList, useTabPanel } from '@react-aria/tabs';
import { useTabListState } from '@react-stately/tabs';

import { TabPanelProps, TabProps, TabsProps } from '@wprdc-types/tabs';

export function Tabs<T extends object>(props: TabsProps<T>) {
  let state = useTabListState(props);
  let ref = React.useRef<HTMLDivElement>(null);
  let { tabListProps } = useTabList(props, state, ref);
  return (
    <div className={styles.container}>
      <div {...tabListProps} ref={ref} className={styles.tabList}>
        {Array.from(state.collection).map(item => (
          <>
            <Tab<T> key={item.key} item={item} state={state} />
          </>
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

export function Tab<T extends object>({ item, state }: TabProps<T>) {
  let { key, rendered } = item;
  let ref = React.useRef<HTMLDivElement>(null);
  let { tabProps } = useTab({ key }, state, ref);
  let isSelected = state.selectedKey === key;
  let isDisabled = state.disabledKeys.has(key);
  return (
    <div
      {...tabProps}
      ref={ref}
      className={classNames(styles.tab, {
        [styles.selected]: isSelected,
        [styles.disabled]: isDisabled,
      })}
    >
      {rendered}
    </div>
  );
}

export function TabPanel<T extends object>({
  state,
  ...props
}: TabPanelProps<T>) {
  let ref = React.useRef<HTMLDivElement>(null);
  let { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <div {...tabPanelProps} ref={ref} className={styles.tabPanel}>
      {state.selectedItem?.props.children}
    </div>
  );
}

export default Tabs;
