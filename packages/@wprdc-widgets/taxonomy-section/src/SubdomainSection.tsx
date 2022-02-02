import * as React from 'react';

import styles from './SubdomainSection.module.css';

import { SectionSharedProps } from '@wprdc-types/taxonomy-section';
import { Subdomain } from '@wprdc-types/profiles';

import IndicatorSection from './IndicatorSection';

interface Props extends SectionSharedProps {
  subdomain: Subdomain;
}

export default function SubdomainSection({
  subdomain,
  geog,
  onExploreDataViz,
  onExploreIndicator,
}: Props) {
  return (
    <div id={subdomain.slug} className={styles.wrapper}>
      <h4 className={styles.title}>{subdomain.name}</h4>
      <div className={styles.description}>{subdomain.description}</div>
      <ul className={styles.indicatorList}>
        {subdomain.indicators.map((indicator) => (
          <li key={`${indicator.slug}-li`} className={styles.indicatorListItem}>
            <IndicatorSection
              key={indicator.slug}
              indicator={indicator}
              geog={geog}
              onExploreDataViz={onExploreDataViz}
              onExploreIndicator={onExploreIndicator}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
