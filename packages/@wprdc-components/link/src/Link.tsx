/**
 *
 * Link
 *
 * A link to some URL
 *
 */
import * as React from 'react';

import './main.css';
import styles from './Link.module.css';

import { FocusRing } from '@react-aria/focus';
import { LinkProps } from '@wprdc-types/link';
import { useLink } from '@react-aria/link';
import { RiExternalLinkLine } from 'react-icons/ri';

export const Link: React.FC<LinkProps> = (props) => {
  const { external } = props;

  const ref = React.useRef<HTMLAnchorElement>(null);
  const { linkProps } = useLink(props, ref);

  return (
    <FocusRing focusRingClass={styles.focusRing}>
      <div>
        <a {...linkProps} />
        {!!external && <RiExternalLinkLine className={styles.focusRing} />}
      </div>
    </FocusRing>
  );
};

export default Link;
