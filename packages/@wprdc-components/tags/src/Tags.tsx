/**
 *
 * Tags
 *
 * [ Contains Tag components ]
 *
 */

import * as React from 'react';

import styles from './Tags.module.css';

import { TagsProps } from '@wprdc-types/tags';
import Tag from '@wprdc-components/tag';

export const Tags: React.FC<TagsProps> = ({ tags, ...props }) => {
  return (
    <div {...props}>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li className={styles.listItem}>
            <Tag {...tag} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
