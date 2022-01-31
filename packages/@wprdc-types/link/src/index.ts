/**
 *
 * Link types
 *
 **/
import * as React from 'react';
import { AriaLinkOptions } from '@react-aria/link';

export interface LinkProps extends AriaLinkOptions {
  external?: boolean;
}
