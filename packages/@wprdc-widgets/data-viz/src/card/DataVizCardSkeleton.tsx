import React from 'react';
import styles from './DataVizCardSkeleton.module.css';
import classNames from 'classnames';

export const DataVizCardSkeleton = () => (
  <div className={classNames(styles.wrapper)}>
    <div className={styles.pulser}>
      <div className={classNames(styles.header)}>
        <div className={classNames(styles.box, styles.typeLabel)} />
        <div className={classNames(styles.box, styles.title)} />
        <div className={classNames(styles.description)}>
          <div className={classNames(styles.box, styles.textLine)} />
          <div className={classNames(styles.box, styles.textLine)} />
          <div className={classNames(styles.box, styles.textLineShort)} />
        </div>
      </div>
      <div className={classNames(styles.dataVizWrapper)}>
        <div className={classNames(styles.box, styles.dataViz)} />
      </div>
      <div className={classNames(styles.extras)}>
        <div className={classNames(styles.sources)}>
          <div className={classNames(styles.box, styles.sourceLabel)} />
          <div className={classNames(styles.box, styles.source)} />
          <div className={classNames(styles.box, styles.source)} />
        </div>
      </div>
      <div className={classNames(styles.menuSection)}>
        <div className="flex">
          <div className="flex-grow" />
          <div className={classNames(styles.box, styles.button)} />
        </div>
      </div>
    </div>
  </div>
);
