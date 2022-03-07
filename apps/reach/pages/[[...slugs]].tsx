import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

import React from 'react';

import {
  Map,
  Geog,
  GeogBrief,
  GeogLevel,
  GeographyType,
  Indicator,
  DataVizBase,
  useProvider,
  menuLayerConnection,
  useGeography,
  useTaxonomy,
  ConnectedMapEventHandler,
  ConnectionCollection,
  ProjectKey,
  LayerPanelVariant,
  LoadingMessage,
  TaxonomySection,
  serializeParams,
} from '@wprdc/toolkit';

import { useRouter } from 'next/router';
import Link from 'next/link';

const Home: NextPage = () => {
  const [geogBrief, setGeogBrief] = React.useState<GeogBrief>(defaultGeogBrief);
  const [pathSlugs, setPathSlugs] = React.useState<string[]>([]);

  const context = useProvider();
  const { geog, isLoading, error } = useGeography(geogBrief.slug);
  const router = useRouter();

  function handleTabChange(domain: React.Key): void {
    router.push(`/${domain}/${serializeParams(router.query)}`, undefined, {
      shallow: true,
    });
  }

  const [domainSlug, subdomainSlug, indicatorSlug, dataVizSlug] = pathSlugs;

  // update state when path updates
  React.useEffect(() => {
    if (!!router.query.slugs) {
      const slugs: string[] =
        typeof router.query.slugs === 'string'
          ? [router.query.slugs]
          : router.query.slugs;
      setPathSlugs(slugs);
    } else {
      setPathSlugs([]);
    }
  }, [router.query.slugs]);

  React.useEffect(() => {
    if (!!geog) context.setGeog(geog);
  }, [geog]);

  const {
    taxonomy,
    isLoading: taxonomyIsLoading,
    error: taxonomyError,
  } = useTaxonomy('reach');

  const handleClick: ConnectedMapEventHandler = (_, __, toolboxItems) => {
    if (!!toolboxItems) {
      const clickedGeogs: GeogBrief[] | undefined =
        toolboxItems[ProjectKey.GeoMenu];
      if (!!clickedGeogs && !!clickedGeogs.length)
        setGeogBrief(clickedGeogs[0]);
    }
  };

  function handleExploreDataViz(dataViz: DataVizBase): void {
    router.push(
      `${domainSlug}/${subdomainSlug}/${indicatorSlug}/${
        dataViz.slug
      }/${serializeParams(router.query)}`,
    );
  }

  function handleExploreIndicator(indicator: Indicator): void {
    let domain: string, subdomain: string;
    if (!!indicator.hierarchies && !!indicator.hierarchies.length) {
      domain = indicator.hierarchies[0].domain.slug;
      subdomain = indicator.hierarchies[0].subdomain.slug;
      router.push(
        `${domain}/${subdomain}/${indicator.slug}/${serializeParams(
          router.query,
        )}`,
      );
    }
  }

  return (
    <div className="p-3">
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.intro}>
            <div className={styles.title}>
              <a href="/">REACH/SSPGH</a>
            </div>
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
            {!!geog && (
              <div>
                <div className={styles.geogTitle}>{geog.title}</div>
              </div>
            )}
            {!!geog && <GeogOverlapListing geog={geog} />}
          </div>
        </div>

        {!taxonomyIsLoading && !!taxonomy && (
          <div className={styles.dashboard}>
            {!!taxonomyIsLoading && (
              <div className={styles.loader}>
                <LoadingMessage message="Loading dashboard..." />
              </div>
            )}

            {taxonomy && (
              <TaxonomySection
                taxonomy={taxonomy}
                currentDomainSlug={domainSlug}
                currentSubdomainSlug={subdomainSlug}
                currentIndicatorSlug={indicatorSlug}
                currentDataVizSlug={dataVizSlug}
                onExploreDataViz={handleExploreDataViz}
                onExploreIndicator={handleExploreIndicator}
                onTabsChange={handleTabChange}
                LinkComponent={Link}
              />
            )}
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

interface GeogOverlapListingProps {
  geog: Geog;
}

function GeogOverlapListing({ geog }: GeogOverlapListingProps) {
  const hoods = geog.overlap.neighborhood;
  const munis = geog.overlap.countySubdivision;

  return (
    <div>
      {!!hoods && !!hoods.length && (
        <div>
          <div className={styles.overlapTitle}>Overlapping Neighborhoods</div>
          {hoods.map((hood) => (
            <a
              className={styles.overlapLink}
              target="_blank"
              rel="noreferrer noopener"
              href={`https://profiles.wprdc.org/explore?geog=${hood.slug}`}
            >
              {hood.name}
            </a>
          ))}
        </div>
      )}
      {!!munis && !!munis.length && (
        <div>
          <div className={styles.overlapTitle}>Overlapping Towns/Cities</div>
          {munis.map((muni) => (
            <a
              className={styles.overlapLink}
              target="_blank"
              rel="noreferrer noopener"
              href={`https://profiles.wprdc.org/explore?geog=${muni.slug}`}
            >
              {muni.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

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
