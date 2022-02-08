import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  GeogBrief,
  ConnectedSearchBox,
  useGeography,
  defaultIndicatorListBoxProps,
  indicatorConnection,
  GeographyPicker,
  Indicator,
  IndicatorView,
  useIndicator,
} from '@wprdc/toolkit';

import styles from '../../../styles/Compare.module.css';
import { serializeParams } from '@wprdc-connections/api';
import { DataVizBase } from '@wprdc-types/viz';
import { Divider } from '@wprdc-components/divider';

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

  const handleGeogSelection = (id: 'a' | 'b') => (gb: GeogBrief) => {
    const paramKey = { a: 'g1', b: 'g2' }[id];
    const path = router.asPath.split('?')[0];
    const newParams = { ...router.query, [paramKey]: gb.slug };

    router.push(`${path}/${serializeParams(newParams)}`);
  };

  function handleIndicatorSelection(ind: Indicator) {
    const path = router.asPath.split('?')[0];
    router.push(`${path}/${serializeParams({ ...router.query, i: ind.slug })}`);
  }

  function handleExploreIndicator(ind: Indicator) {
    console.log(ind.slug);
    router.push(`indicator/${ind.slug}`);
  }

  function handleExploreDataViz(dv: DataVizBase) {
    router.push(`../data-viz/${dv.slug}`);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.indicatorSection}>
        <h1 className={styles.cta}>Pick an indicator to compare: </h1>
        <ConnectedSearchBox
          connection={indicatorConnection}
          listBoxProps={defaultIndicatorListBoxProps}
          onSelection={handleIndicatorSelection}
        />
      </div>
      <div className={styles.dashboard}>
        <div className={styles.dashboardSection}>
          <div className={styles.geoSection}>
            <GeographyPicker
              onSelection={handleGeogSelection('a')}
              selectedGeog={geogA}
            />
            <h2 className={styles.geogTitle}>
              {geogA ? geogA.title : 'no geography selected'}
            </h2>
          </div>
          <div className={styles.indSection}>
            <IndicatorView
              indicator={indicator}
              geog={geogA}
              onExploreIndicator={handleExploreIndicator}
              onExploreDataViz={handleExploreDataViz}
            />
          </div>
        </div>
        <Divider vertical weight="thick" />
        <div className={styles.dashboardSection}>
          <div className={styles.geoSection}>
            <GeographyPicker
              onSelection={handleGeogSelection('b')}
              selectedGeog={geogB}
            />
            <h2 className={styles.geogTitle}>
              {geogB ? geogB.title : 'no geography selected'}
            </h2>
          </div>
          <div className={styles.indSection}>
            <IndicatorView
              indicator={indicator}
              geog={geogB}
              onExploreIndicator={handleExploreIndicator}
              onExploreDataViz={handleExploreDataViz}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
