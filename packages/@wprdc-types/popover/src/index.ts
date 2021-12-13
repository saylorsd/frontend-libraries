/**
 *
 * Popover types
 *
 **/
import * as React from 'react';

export interface PopoverProps {
  popoverRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}
