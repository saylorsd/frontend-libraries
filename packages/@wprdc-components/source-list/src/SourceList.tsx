/**
 *
 * SourceList
 *
 */
import React from 'react';

import './main.css';
import styles from './SourceList.module.css';

import { SourceBase } from '@wprdc-types/viz';

import { DataChip } from '@wprdc-components/data-chip';
import { Tooltip } from '@wprdc-components/tooltip';
import { Link } from '@wprdc-components/link';

interface Props {
  sources: SourceBase[];
}

export function SourceList(props: Props) {
  const { sources } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sources</div>
      <ul className={styles.list}>
        {sources.map((source) => (
          <li key={source.slug} className={styles.listItem}>
            <Tooltip
              title={source.name}
              content={
                <div className={styles.popover}>
                  <Link external>
                    <a href={source.infoLink}>{source.infoLink}</a>
                  </Link>
                  <p>{source.description}</p>
                </div>
              }
            >
              <DataChip value={source.name} icon="database" color="primary" />
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SourceList;
