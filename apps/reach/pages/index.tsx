import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import React from 'react';

import { Map } from '@wprdc-widgets/map';

import { GeogBrief, GeogLevel, GeographyType } from '@wprdc-types/geo';
import { Indicator } from '@wprdc-types/profiles';
import { DataVizBase } from '@wprdc-types/viz';
import { useProvider } from '@wprdc-components/provider';
import { menuLayerConnection, useGeography } from '@wprdc-connections/geo';
import { useTaxonomy } from '@wprdc-connections/profiles';
import {
  ConnectedMapEventHandler,
  ConnectionCollection,
} from '@wprdc-types/connections';
import { ProjectKey } from '@wprdc-types/shared';
import { LayerPanelVariant } from '@wprdc-types/map';
import { IndicatorView } from '@wprdc-widgets/indicator-view';
import { LoadingMessage } from '@wprdc-components/loading-message';

const Home: NextPage = () => {
  const [geogBrief, setGeogBrief] = React.useState<GeogBrief>(defaultGeogBrief);
  const [selectedIndicator, setSelectedIndicator] = React.useState<Indicator>();
  const [dataViz, setDataViz] = React.useState<DataVizBase>();

  const context = useProvider();
  const { geog, isLoading, error } = useGeography(geogBrief.slug);

  React.useEffect(() => {
    if (!!geog) context.setGeog(geog);
  }, [geog]);

  const {
    taxonomy,
    isLoading: taxonomyIsLoading,
    error: taxonomyError,
  } = useTaxonomy();

  const handleClick: ConnectedMapEventHandler = (_, __, toolboxItems) => {
    if (!!toolboxItems) {
      const clickedGeogs: GeogBrief[] | undefined =
        toolboxItems[ProjectKey.GeoMenu];
      if (!!clickedGeogs && !!clickedGeogs.length)
        setGeogBrief(clickedGeogs[0]);
    }
  };

  function handleExploreIndicator(indicator: Indicator) {
    setSelectedIndicator(indicator);
  }

  function handleExploreDataViz(dataViz: DataVizBase) {
    setDataViz(dataViz);
  }

  const domain = React.useMemo(() => {
    if (!!taxonomy)
      return taxonomy.find((d) => (d.slug = 'reach-sustainable-pgh'));
    return undefined;
  }, [taxonomy]);

  return (
    <div className="p-3">
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.intro}>
            <div className={styles.title}>REACH/SSPGH</div>
            <div className={styles.subtitle}>Indicators of some sort</div>
            <p className={styles.description}>
              Grandis visus satis manifestums brabeuta est. Candidatus de
              emeritis gluten, prensionem accentor! Est castus decor, cesaris.
              Liberi de audax devirginato, attrahendam classis! Neuter spatii
              nunquam locuss gluten est. Ubi est peritus galatae.
            </p>
            <p className={styles.description}>
              Cum ignigena mori, omnes mineralises transferre brevis, fortis
              coordinataees. Festus, noster detriuss acceleratrix acquirere de
              germanus, flavum sectam. Cum demissio volare, omnes classises amor
              noster, superbus hilotaees. Barbatus, altus mineraliss unus
              prensionem de albus, pius luba.
            </p>
          </div>
          <div className={styles.mapSection}>
            <Map
              initialViewState={{
                zoom: 9.5,
                longitude: -79.92,
                latitude: 40.37,
              }}
              layerPanelVariant={LayerPanelVariant.None}
              connections={[menuLayerConnection] as ConnectionCollection}
              onClick={handleClick}
              connectionHookArgs={{
                [ProjectKey.GeoMenu]: {
                  layerItems: geogLevels,
                  layerSelection: selectedGeogLevel,
                  options: {
                    baseFilter: [
                      'in',
                      ['get', 'global_geoid'],
                      ['literal', REACH_TRACTS],
                    ],
                  },
                },
              }}
            />
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.geoDetails}>
            {!!geog && <div className={styles.geogTitle}>{geog.title}</div>}
          </div>
        </div>

        {!!selectedIndicator && (
          <IndicatorView
            indicator={selectedIndicator}
            geog={geog}
            onExploreIndicator={handleExploreIndicator}
            onExploreDataViz={handleExploreDataViz}
          />
        )}

        {!selectedIndicator && !taxonomyIsLoading && !!domain && (
          <div className={styles.dashboard}>
            {!!taxonomyIsLoading && (
              <div className={styles.loader}>
                <LoadingMessage message="Loading dashboard..." />
              </div>
            )}

            {domain.subdomains.map((subdomain) => (
              <div
                className={styles.subdomainSection}
                style={{ display: !!selectedIndicator ? 'hidden' : 'visible' }}
              >
                <div className={styles.subdomainTitle}>{subdomain.name}</div>
                <div className={styles.subdomainContent}>
                  {subdomain.indicators.map((indicator) => (
                    <div className={styles.indicatorSection}>
                      <IndicatorView
                        card
                        indicator={indicator}
                        geog={geog}
                        onExploreIndicator={handleExploreIndicator}
                        onExploreDataViz={handleExploreDataViz}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
};

const defaultGeogBrief: GeogBrief = {
  id: 2213,
  name: '5140',
  slug: 'tract-42003514000',
  title: 'Tract 42003514000',
  geogType: GeographyType.Tract,
  geogID: '42003514000',
};

const geogLevels: GeogLevel[] = [
  {
    id: GeographyType.Tract,
    slug: GeographyType.Tract,
    name: 'Tracts',
    description: 'Census Tracts',
  },
];

const selectedGeogLevel: Set<React.Key> = new Set([GeographyType.Tract]);

const REACH_TRACTS = [
  '42003220600',
  '42003250300',
  '42003250900',
  '42003261400',
  '42003262000',
  '42003562700',
  '42003563200',
  '42003030500',
  '42003050100',
  '42003050900',
  '42003051100',
  '42003101600',
  '42003101700',
  '42003120300',
  '42003120400',
  '42003130100',
  '42003130200',
  '42003130300',
  '42003130400',
  '42003130600',
  '42003560600',
  '42003561000',
  '42003561100',
  '42003561200',
  '42003561500',
  '42003486700',
  '42003492700',
  '42003492800',
  '42003492900',
  '42003504100',
  '42003510000',
  '42003512800',
  '42003514000',
  '42003551200',
  '42003551900',
  '42003552000',
  '42003552100',
];

export default Home;
