import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GeographyPicker, Indicator, IndicatorView } from '@wprdc/toolkit';
import { GeogBrief } from '@wprdc-types/geo';
import {
  defaultIndicatorListBoxProps,
  indicatorConnection,
  useIndicator,
} from '@wprdc-connections/profiles';
import { ConnectedSearchBox } from '@wprdc-components/search-box';
import { useGeography } from '@wprdc-connections/geo';

import styles from '../../../styles/Compare.module.css';

export default function IndicatorComparisonPage() {
  const [indicatorSlug, setIndicatorSlug] = useState<string>();
  const [geogSlugA, setGeogSlugA] = useState<string>();
  const [geogSlugB, setGeogSlugB] = useState<string>();

  const router = useRouter();

  const { geog: geogA } = useGeography(geogSlugA);
  const { geog: geogB } = useGeography(geogSlugB);
  const { indicator } = useIndicator(indicatorSlug);

  useEffect(() => {
    if (router.query) {
      const { g1, g2, i } = router.query;
      if (typeof g1 === 'string') setGeogSlugA(g1);
      if (typeof g2 === 'string') setGeogSlugB(g2);
      if (typeof i === 'string') setIndicatorSlug(i);
    }
  }, [router.query]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.indicatorSection}>
        <h1 className={styles.cta}>Pick an indicator to compare: </h1>
        <ConnectedSearchBox
          connection={indicatorConnection}
          listBoxProps={defaultIndicatorListBoxProps}
          onSelection={({ slug }: Indicator) => setIndicatorSlug(slug)}
        />
      </div>
      <div className={styles.dashboard}>
        <div className={styles.dashboardSection}>
          <div className={styles.geoSection}>
            <GeographyPicker
              onSelection={({ slug }: GeogBrief) => setGeogSlugA(slug)}
              selectedGeog={geogA}
            />
            <h2>{geogA ? geogA.title : 'no geography selected'}</h2>
          </div>
          <div className={styles.indSection}>
            <IndicatorView indicator={indicator} geog={geogA} />
          </div>
        </div>
        <div className={styles.dashboardSection}>
          <div className={styles.geoSection}>
            <GeographyPicker
              onSelection={({ slug }: GeogBrief) => setGeogSlugA(slug)}
              selectedGeog={geogB}
            />
            <h2>{geogB ? geogB.title : 'no geography selected'}</h2>
          </div>
          <div className={styles.indSection}>
            <IndicatorView indicator={indicator} geog={geogB} />
          </div>
        </div>
      </div>
    </div>
  );
}
