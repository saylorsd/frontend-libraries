/**
 *
 * Indicator
 *
 * A related collection of data vizes.
 *
 */
import * as React from 'react';

import classnames from 'classnames';

import './main.css';
import styles from './IndicatorView.module.css';

import { IndicatorViewProps } from '@wprdc-types/indicator-view';
import { DataVizType } from '@wprdc-types/shared';
import { DataVizID } from '@wprdc-types/viz';
import { DataVizVariant } from '@wprdc-types/data-viz';

import { LoadingMessage } from '@wprdc-components/loading-message';
import { ConnectedDataViz } from '@wprdc-widgets/data-viz';
import { Button } from '@wprdc-components/button';
import { Divider } from '@wprdc-components/divider';

export const IndicatorView: React.FC<IndicatorViewProps> = ({
  indicator,
  geog,
  card,
  onExploreDataViz,
  onExploreIndicator,
  isLoading,
}) => {
  if (!!isLoading) return <LoadingMessage />;
  if (!indicator) return <div />;

  const { name, description, dataVizes } = indicator || {};

  // load first data viz (will eventually be some sort of master one or something)
  const primaryDataViz = !!dataVizes && dataVizes[0];

  const { blurbs, vizes } = dataVizes.reduce<
    Record<'blurbs' | 'vizes', DataVizID[]>
  >(
    (record, viz) => {
      if (viz.vizType === DataVizType.BigValue) {
        return { blurbs: [...record.blurbs, viz], vizes: record.vizes };
      }
      return { blurbs: record.blurbs, vizes: [...record.vizes, viz] };
    },
    { blurbs: [], vizes: [] }
  );

  function handleExploreIndicator() {
    if (!!onExploreIndicator && !!indicator) onExploreIndicator(indicator);
  }

  return (
    <div
      className={classnames(styles.container, { [styles.containerCard]: card })}
    >
      {card && (
        <div className={styles.vizPane}>
          {card && primaryDataViz && (
            <ConnectedDataViz
              variant={DataVizVariant.Preview}
              key={primaryDataViz.slug}
              dataVizSlug={primaryDataViz.slug}
              onExplore={onExploreDataViz}
            />
          )}
        </div>
      )}
      <div
        className={classnames(styles.details, { [styles.stretchy]: !!card })}
      >
        <div>
          {!!name && (
            <div className={styles.titleBar}>
              <div className={styles.titleDiv}>
                <h5 className={card ? styles.title : styles.bigTitle}>
                  {name}
                </h5>
              </div>
              <div className={styles.menuButtonDiv}>
                {/* todo: add menu button*/}
              </div>
            </div>
          )}
        </div>
        <div className={styles.descriptionContainer}>
          <p
            className={classnames({
              [styles.description]: !card,
              [styles.cardDescription]: card,
            })}
          >
            {description}
          </p>
        </div>
      </div>

      {!card && (
        <>
          {!!blurbs && !!blurbs.length && (
            <div className={styles.blurbs}>
              <h6 className={styles.subtitle}>Quick Facts</h6>
              <ul className={styles.blurbList}>
                {blurbs.map((blurb) => (
                  <li className={styles.blurbListItem}>
                    <ConnectedDataViz
                      geog={geog}
                      variant={DataVizVariant.Blurb}
                      dataVizSlug={blurb.slug}
                      onExplore={onExploreDataViz}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!!vizes && !!vizes.length && (
            <div className={styles.vizes}>
              <h6 className={styles.subtitle}>Tables and Visualizations</h6>
              <ul className={styles.vizList}>
                {vizes.map((viz) => (
                  <li className={styles.vizListItem}>
                    <ConnectedDataViz
                      geog={geog}
                      variant={DataVizVariant.Card}
                      dataVizSlug={viz.slug}
                      onExplore={onExploreDataViz}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {card && (
        <>
          <Divider weight="thin" />
          <div className={styles.menuSection}>
            <div className="flex">
              <div />
              <div className="flex-grow" />
              <Button onPress={handleExploreIndicator}>Explore</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndicatorView;
