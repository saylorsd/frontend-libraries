import { DataVizVariant, ErrorMessage, LoadingMessage } from '@wprdc/toolkit';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import BlankLayout from '../../../components/BlankLayout';
import Layout from '../../../components/Layout';
import { useGeography } from '@wprdc-connections/geo';
import {
  dataVizConnection,
  defaultVizListBoxProps,
  useDataViz,
} from '@wprdc-connections/viz';
import styles from '../../../styles/Indicator.module.css';
import { ConnectedSearchBox } from '@wprdc-components/search-box';
import { GeogBrief } from '@wprdc-types/geo';
import { serializeParams } from '@wprdc-connections/api';
import { DataVizID } from '@wprdc-types/viz';
import { DataViz } from '@wprdc-widgets/data-viz';
import DataVizLandingPage from '../../../parts/DataVizLandingPage';
import { DEFAULT_GEOG_SLUG } from '../../../settings';

export default function DataVizPage() {
  const [slug, setSlug] = useState<string>();
  const [geogSlug, setGeogSlug] =
    useState<string | undefined>(DEFAULT_GEOG_SLUG);
  const [embed, setEmbed] = useState<boolean>();

  const router = useRouter();

  const { geog } = useGeography(geogSlug);
  const {
    dataViz,
    isLoading: dvLoading,
    error: dvError,
  } = useDataViz(slug, geogSlug);

  // handle query params
  useEffect(() => {
    const { slug: _slug, embed, g, ...params } = router.query;
    // read indicator slug from path
    if (!!_slug && _slug.length) setSlug(_slug[0]);
    // read geography
    if (typeof g === 'string') setGeogSlug(g);
    // if no geog provided, add default param to url
    else if (!g)
      router.push(
        `/explore/indicator/${_slug}/${serializeParams({
          ...params,
          embed,
          g: DEFAULT_GEOG_SLUG,
        })}`,
      );
    // embedded state
    setEmbed(!!embed);
  }, [router.query]);

  function handleGeogSelection(g: GeogBrief) {
    const { slug, ...params } = router.query;
    router.push(
      `/explore/data-viz/${slug}/${serializeParams({ ...params, g: g.slug })}`,
    );
  }

  function handleDataVizSelection(d: DataVizID) {
    const { slug, ...params } = router.query;
    router.push(`/explore/data-viz/${d.slug}/${serializeParams(params)}`);
  }

  // determine the content to display in the main section
  const mainContent = useMemo(() => {
    // landing page requested `/`
    if (!dataViz && !dvLoading && !dvError) return <DataVizLandingPage />;
    // loading
    if (!!dvLoading)
      return (
        <div className={styles.loadingWrapper}>
          <LoadingMessage message="Loading indicator..." />
        </div>
      );
    // indicator requested
    if (!!dataViz)
      return (
        <DataViz
          variant={DataVizVariant.Details}
          dataViz={dataViz}
          showGeog={!embed}
          onGeogSelection={handleGeogSelection}
          geog={geog}
        />
      );
    // finally error
    return (
      <div className={styles.loadingWrapper}>
        <ErrorMessage title="Error" message={dvError || 'Unknown error'} />
      </div>
    );
  }, [slug, dataViz, dvError, dvLoading]);

  return (
    <div className={embed ? styles.embedWrapper : styles.wrapper}>
      {!embed && (
        <div className={styles.searchSection}>
          <p className={styles.searchLabel} id="search-label">
            Search for another Data Viz
          </p>
          <ConnectedSearchBox
            aria-labelledby="search-label"
            connection={dataVizConnection}
            listBoxProps={defaultVizListBoxProps}
            onSelection={handleDataVizSelection}
            inputValue={dataViz && dataViz.name}
            selectedKey={slug}
          />
        </div>
      )}
      <main className={styles.mainSection}>{mainContent}</main>
    </div>
  );
}

DataVizPage.getLayout = function getLayout(page: React.ReactChildren) {
  const router = useRouter();
  const { embed } = router.query;
  if (!!embed) return <BlankLayout>{page}</BlankLayout>;
  return <Layout>{page}</Layout>;
};
