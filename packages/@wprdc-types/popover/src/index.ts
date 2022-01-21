/**
 *
 * Popover types
 *
 **/
import * as React from 'react';

import { OverlayProps } from '@react-aria/overlays';

export interface PopoverProps extends OverlayProps {
  popoverRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}
