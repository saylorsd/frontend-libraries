/**
 *
 * Legend
 *
 */
import * as React from 'react';
import '../../../styles/global.css';

import { LegendProps } from '../types';
import { _useMapControl as useMapControl } from 'react-map-gl';

import styles from './Legend.module.css';

export const Legend: React.FC<LegendProps> = ({
  title,
  assetToolbox,
  menuToolbox,
  children,
}) => {
  const { containerRef } = useMapControl({
    captureScroll: true,
    captureDrag: true,
    captureClick: true,
    captureDoubleClick: true,
    capturePointerMove: true,
  });

  return (
    <div ref={containerRef} className={styles.container}>
      {!!title && <div className={styles.title}>{title}</div>}
      {!!menuToolbox && menuToolbox.legendSection}
      {!!assetToolbox && assetToolbox.legendSection}
      {children}
    </div>
  );
};

Legend.defaultProps = {
  title: 'Legend',
};

export default Legend;
