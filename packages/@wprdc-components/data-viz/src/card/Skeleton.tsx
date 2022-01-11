import React from 'react';
import styles from './Skeleton.module.css';
import classNames from 'classnames';

export const Skeleton = () => (
  <div className={classNames(styles.wrapper)}>
    <div className="animate-pulse">
      <div className={classNames(styles.header)}>
        <div className={classNames(styles.box, styles.typeLabel)} />
        <div className={classNames(styles.box, styles.title)} />
        <div className={classNames(styles.description)}>
          <div className={classNames(styles.description, styles.textLine)} />
          <div className={classNames(styles.description, styles.textLine)} />
          <div
            className={classNames(styles.description, styles.textLineShort)}
          />
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
