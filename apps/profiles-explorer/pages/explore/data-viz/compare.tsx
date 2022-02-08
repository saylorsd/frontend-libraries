import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  ConnectedSearchBox,
  DataViz,
  dataVizConnection,
  DataVizID,
  DataVizVariant,
  defaultVizListBoxProps,
  GeogBrief,
  GeographyPicker,
  serializeParams,
  useDataViz,
  useGeography,
} from '@wprdc/toolkit';

import styles from '../../../styles/Compare.module.css';

export default function IndicatorComparisonPage() {
  const [dataVizSlug, setDataVizSlug] = useState<string>();
  const [geogSlugA, setGeogSlugA] = useState<string>();
  const [geogSlugB, setGeogSlugB] = useState<string>();

  const router = useRouter();

  const { geog: geogA } = useGeography(geogSlugA);
  const { geog: geogB } = useGeography(geogSlugB);
  const { dataViz } = useDataViz(dataVizSlug);

  useEffect(() => {
    if (router.query) {
      const { g1, g2, d } = router.query;
      if (typeof g1 === 'string') setGeogSlugA(g1);
      if (typeof g2 === 'string') setGeogSlugB(g2);
      if (typeof d === 'string') setDataVizSlug(d);
    }
  }, [router.query]);

  const handleGeogSelection = (id: 'a' | 'b') => (gb: GeogBrief) => {
    const paramKey = { a: 'g1', b: 'g2' }[id];
    const path = router.asPath.split('?')[0];
    const newParams = { ...router.query, [paramKey]: gb.slug };

    router.push(`${path}/${serializeParams(newParams)}`);
  };

  function handleDataVizSelection(dv: DataVizID) {
    const path = router.asPath.split('?')[0];
    router.push(`${path}/${serializeParams({ ...router.query, d: dv.slug })}`);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.indicatorSection}>
        <h1 className={styles.cta}>Pick an Data Viz to compare: </h1>
        <ConnectedSearchBox
          connection={dataVizConnection}
          listBoxProps={defaultVizListBoxProps}
          onSelection={handleDataVizSelection}
        />
      </div>
      <div className={styles.dashboard}>
        <div className={styles.dashboardSection}>
          <div className={styles.geoSection}>
            <GeographyPicker
              onSelection={handleGeogSelection('a')}
              selectedGeog={geogA}
            />
            <h2>{geogA ? geogA.title : 'no geography selected'}</h2>
          </div>
          <div className={styles.indSection}>
            <DataViz
              variant={DataVizVariant.Details}
              dataViz={dataViz}
              geog={geogA}
            />
          </div>
        </div>
        <div className={styles.dashboardSection}>
          <div className={styles.geoSection}>
            <GeographyPicker
              onSelection={handleGeogSelection('b')}
              selectedGeog={geogB}
            />
            <h2>{geogB ? geogB.title : 'no geography selected'}</h2>
          </div>
          <div className={styles.indSection}>
            <DataViz
              variant={DataVizVariant.Details}
              dataViz={dataViz}
              geog={geogB}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
