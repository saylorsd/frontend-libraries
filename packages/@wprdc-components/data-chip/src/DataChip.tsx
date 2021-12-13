/**
 *
 * LabeledValue
 *
 * [ Shows a value with a label and or icon. ]
 *
 */

import * as React from 'react';
import './main.css';
import styles from './DataChip.module.css';
import classNames from 'classnames';

import { DataChipProps } from '@wprdc-types/data-chip';


//todo: bring back icons
export const DataChip: React.FC<DataChipProps> = props => {
  const {
    value,
    numberFormatOptions,
    icon,
    iconProps,
    label,
    href,
    fullWidth,
    color,
    size = 'M',
  } = props;

  let displayValue = value;
  if (numberFormatOptions && typeof value === 'number') {
    displayValue = value.toLocaleString('en-US', numberFormatOptions);
  }
  const title = `${displayValue}`;
  // const Icon = typeof icon === 'string' ? icons[icon] : icon;

  return (
    <div
      className={classNames(
        styles.container,
        styles[`size-${size}`],
        fullWidth ? 'w-full' : '',
      )}
    >
      <div className={classNames(styles.label, `bg-${color}-300`)}>
        {/*{!!Icon && <Icon {...iconProps} className={styles.icon} />}*/}
        {!!label && <div className={styles.labelText}>{label}</div>}
      </div>
      <div className={styles.value}>
        {!!href ? (
          <a href={href} title={title}>
            {displayValue}
          </a>
        ) : (
          <p className={styles.valueText} title={title}>
            {displayValue}
          </p>
        )}
      </div>
    </div>
  );
};

export default DataChip;
