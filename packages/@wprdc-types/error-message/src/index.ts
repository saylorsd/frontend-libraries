/**
 *
 * ErrorMessage types
 *
 **/
import React from 'react';

export interface ErrorMessageProps {
  title: React.ReactNode;
  message: React.ReactNode;
  variant?: 'inline' | 'centered' | 'illustrated';
}
