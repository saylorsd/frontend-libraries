import { AriaSelectProps } from '@react-types/select';

/**
 *
 * Select types
 *
 **/

export interface SelectProps<T> extends AriaSelectProps<T> {
  onSelection?: (item: T) => unknown;
}
