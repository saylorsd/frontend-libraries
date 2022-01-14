import * as React from 'react';

import styles from './Reach.module.css';

import { Map } from '../packages/@wprdc-widgets/map';
import { menuLayerConnection } from '../packages/@wprdc-connections/geo';
import {
  ConnectionCollection,
  ConnectedMapEventHandler,
} from '../packages/@wprdc-types/connections';
import { LayerPanelVariant } from '../packages/@wprdc-types/map';
import {
  GeogLevel,
  GeographyType,
  GeogBrief,
} from '../packages/@wprdc-types/geo';
import { ProjectKey } from '../packages/@wprdc-types/shared';
import { useGeography } from '../packages/@wprdc-connections/geo';
import { useTaxonomy } from '../packages/@wprdc-connections/profiles';
import { IndicatorView } from '../packages/@wprdc-widgets/indicator-view';
import { useProvider } from '../packages/@wprdc-components/provider';
import { LoadingMessage } from '../packages/@wprdc-components/loading-message';

export default {
  title: 'Demos/REACH Demo',
};

export const Default = () => {
  const [geogBrief, setGeogBrief] = React.useState<GeogBrief>(defaultGeogBrief);
  const context = useProvider();
  const { geog, isLoading, error } = useGeography(geogBrief);

  React.useEffect(() => {
    if (!!geog) context.setGeog(geog);
  }, [geog]);

  const {
    taxonomy,
    isLoading: taxonomyIsLoading,
    error: taxonomyError,
  } = useTaxonomy();

  console.log({ context });

  const handleClick: ConnectedMapEventHandler = (_, __, toolboxItems) => {
    if (!!toolboxItems) {
      const clickedGeogs: GeogBrief[] | undefined =
        toolboxItems[ProjectKey.GeoMenu];
      if (!!clickedGeogs && !!clickedGeogs.length)
        setGeogBrief(clickedGeogs[0]);
    }
  };

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
              defaultViewport={{ zoom: 7 }}
              layerPanelVariant={LayerPanelVariant.None}
              connections={[menuLayerConnection] as ConnectionCollection}
              onClick={handleClick}
              connectionHookArgs={{
                [ProjectKey.GeoMenu]: {
                  layerItems: geogLevels,
                  layerSelection: selectedGeogLevel,
                },
              }}
            />
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.geoDetails}>
            {!!geog && <div className={styles.geogTitle}>{geog.title}</div>}
          </div>
          <div className={styles.contextDetails}>
            Pius, noster assimilatios mechanice demitto de salvus, audax
            cannabis. Cum messor mori, omnes compateres imperium grandis, gratis
            indexes. Cum tabes potus, omnes candidatuses demitto germanus,
            brevis brabeutaes. Lapsuss sunt musas de barbatus amor.
          </div>
        </div>
        <div className={styles.dashboard}>
          {!!taxonomyIsLoading && (
            <LoadingMessage message="Loading dashboard..." />
          )}
          {!taxonomyIsLoading &&
            !!domain &&
            domain.subdomains.map((subdomain) => (
              <div className={styles.subdomainSection}>
                <div className={styles.subdomainTitle}>{subdomain.name}</div>
                <div className={styles.subdomainContent}>
                  {subdomain.indicators.map((indicator) => (
                    <div className={styles.indicatorSection}>
                      <IndicatorView card indicator={indicator} geog={geog} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
};

const defaultGeogBrief: GeogBrief = {
  id: 3048,
  name: 'Pittsburgh',
  slug: 'county-subdivision-4200361000',
  title: 'Pittsburgh',
  geogType: GeographyType.CountySubdivision,
  geogID: '4200361000',
};

const geogLevels: GeogLevel[] = [
  {
    id: GeographyType.CountySubdivision,
    slug: GeographyType.CountySubdivision,
    name: 'County Subdivision',
    description: 'Townships, municipalities, boroughs and cities.',
  },
];

const selectedGeogLevel: Set<React.Key> = new Set([geogLevels[0].id]);
