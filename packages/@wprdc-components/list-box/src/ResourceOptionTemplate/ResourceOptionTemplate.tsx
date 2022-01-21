import * as React from 'react';

import '../main.css';
import styles from './ResourceOptionTemplate.module.css';
import { ResourceOptionTemplateProps } from '@wprdc-types/list-box';
import { Resource } from '@wprdc-types/shared';

export function ResourceOptionTemplate<T extends Resource>(
  props: ResourceOptionTemplateProps<T>,
) {
  const {
    item,
    getIcon,
    Icon,
    titleField = 'name',
    subtitleField = 'description',
  } = props;

  // Try `getIcon`, and then `Icon` to generate an icon.
  const DisplayIcon = React.useMemo(() => {
    if (!!getIcon) {
      const result = getIcon(item);
      if (result) return result;
    }
    return Icon;
  }, [item, getIcon, Icon]);

  return (
    <div className={styles.wrapper}>
      {!!Icon && (
        <div className={styles.iconWrapper}>
          <DisplayIcon className={styles.icon} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.title}>{item[titleField]}</div>
        <div className={styles.subtitle}>{item[subtitleField]}</div>
      </div>
    </div>
  );
}
