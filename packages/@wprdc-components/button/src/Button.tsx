/**
 *
 * Button
 *
 * Press it
 *
 */
import * as React from 'react';
import { useRef } from 'react';

import classNames from 'classnames';

import { useButton } from '@react-aria/button';
import { ButtonProps } from '@wprdc-types/button';

import './main.css';
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = props => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { children, color = 'default' } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={
        color === 'none'
          ? ''
          : classNames([
              styles.container,
              styles[color],
              { [styles.elevated]: props.elevated },
            ])
      }
    >
      {children}
    </button>
  );
};

export default Button;
