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

import { LinkProps } from '@wprdc-types/link';
import { useLink } from '@react-aria/link';
// import { RiExternalLinkLine } from 'react-icons/ri';

export const Link: React.FC<LinkProps> = (props) => {
  const { external } = props;

  const ref = React.useRef<HTMLAnchorElement>(null);
  const { linkProps } = useLink(props, ref);

  return (
    <a
      {...linkProps}
      ref={ref}
      href={props.href}
      target={props.target}
      className={styles.link}
    >
      {props.children}
      {/*{external && <RiExternalLinkLine className={styles.icon} />}*/}
    </a>
  );
};

export default Link;
