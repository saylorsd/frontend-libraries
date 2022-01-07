/**
 *
 * ListBox types
 *
 **/
import { Key, RefObject } from 'react';

import {
  AriaListBoxOptions,
  AriaListBoxSectionProps,
  AriaOptionProps,
} from '@react-aria/listbox';

import { CollectionChildren, Node } from '@react-types/shared';

import { ListState } from '@react-stately/list';

interface ListBoxBase {
  /** Whether to make the list fill its parent's width */
  fullWidth?: boolean;
  loadingMessage?: string;
  dense?: boolean;
}

export interface ListBoxProps<T> extends AriaListBoxOptions<T>, ListBoxBase {
  children: CollectionChildren<T>;
}

export interface ListBoxState<T> extends ListState<T> {
  // from SelectState in react-aria
  /** Whether the select is currently focused. */
  readonly isFocused?: boolean;
  /** Sets whether the select is focused. */
  setFocused?(isFocused: boolean): void;
}

export interface StatelessListBoxProps<T>
  extends AriaListBoxOptions<T>,
    ListBoxBase {
  /** Externally-managed state to render in the ListBox */
  state: ListBoxState<T>;
  listBoxRef?: RefObject<HTMLUListElement>;
}

export interface ListBoxSectionProps<T> extends AriaListBoxSectionProps {
  section: Node<T>;
  state: ListState<T>;
  dense?: boolean;
}

export interface OptionProps<T> extends AriaOptionProps {
  item: Node<T>;
  state: ListState<T>;
  onAction?: (key: Key) => void;
  dense?: boolean;
}
