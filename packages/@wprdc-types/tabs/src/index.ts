/**
 *
 * Tabs types
 *
 **/
import {
  AriaTabListProps,
  AriaTabPanelProps,
  AriaTabProps,
} from '@react-types/tabs';

import { Node } from '@react-types/shared';
import { TabListState } from '@react-stately/tabs';
import { Resource } from '@wprdc-types/shared';

export interface TabsProps<T extends Resource> extends AriaTabListProps<T> {}

export interface TabProps<T extends object> extends AriaTabProps {
  item: Node<T>;
  state: TabListState<T>;
}

export interface TabPanelProps<T extends object> extends AriaTabPanelProps {
  state: TabListState<T>;
}
