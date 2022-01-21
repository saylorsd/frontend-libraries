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
import { Resource } from '@wprdc-types/shared';

/**
 *
 * T shape of object represent by list box.
 * P props for option template
 */
export interface ListBoxOptions<T, P = {}> {
  /** Whether to make the list fill its parent's width */
  fullWidth?: boolean;
  loadingMessage?: string;
  dense?: boolean;
  /** Template to render the displayed value */
  optionTemplate?: OptionTemplate<T, P>;
  /** Options to send as props to `optionTemplate`s when used */
  optionTemplateOptions?: P;
}

export interface ListBoxProps<T>
  extends AriaListBoxOptions<T>,
    ListBoxOptions<T> {
  children: CollectionChildren<T>;
}

export interface ListBoxState<T> extends ListState<T> {
  // from SelectState in react-aria
  /** Whether the select is currently focused. */
  readonly isFocused?: boolean;

  /** Sets whether the select is focused. */
  setFocused?(isFocused: boolean): void;
}

export type OptionTemplateProps<T, P = {}> = P & {
  item: T;
};

/** All optoin template types should derive from this */
export type OptionTemplate<T, P> = React.FC<OptionTemplateProps<T, P>>;

/** Props for `ResourceOptionTemplate` */
export type ResourceOptionTemplateProps<T extends Resource> =
  OptionTemplateProps<T, ResourceOptionTemplateOptions<T>>;

export interface ResourceOptionTemplateOptions<T extends Resource> {
  /**
   * Function that accepts a Resource object and returns an Icon component.
   *
   * If the function returns null or undefined, `Icon` or nothing will be used
   */
  getIcon?: (
    item: T,
  ) => React.FC<React.HTMLAttributes<HTMLOrSVGElement>> | null | undefined;
  /**
   * Icon component. Will be overridden by result of `getIcon` if `getIcon` is
   *   provided and returns a component.
   *
   * Setting this with getIcon will use it as a fallback/default.
   */
  Icon?: React.FC<{ item: T } & React.HTMLAttributes<HTMLOrSVGElement>>;
  /** Field in resource to use for the title */
  titleField?: keyof T;
  /** Field in resource to use for the subtitle */
  subtitleField?: keyof T;
}

export interface StatelessListBoxProps<T>
  extends AriaListBoxOptions<T>,
    ListBoxOptions<T> {
  /** Externally-managed state to render in the ListBox */
  state: ListBoxState<T>;
  /** Externally-managed ref to use for the listBox */
  listBoxRef?: RefObject<HTMLUListElement>;
}

export interface ListBoxSectionProps<T, P> extends AriaListBoxSectionProps {
  section: Node<T>;
  state: ListState<T>;
  dense?: boolean;

  /** Template to render the displayed value */
  optionTemplate?: OptionTemplate<T, P>;
}

export interface OptionProps<T, P = {}>
  extends AriaOptionProps,
    ListBoxOptions<T, P> {
  item: Node<T>;
  state: ListState<T>;
  onAction?: (key: Key) => void;
  dense?: boolean;
  /** Template to render the displayed value */
  Template?: OptionTemplate<T, P>;
}
