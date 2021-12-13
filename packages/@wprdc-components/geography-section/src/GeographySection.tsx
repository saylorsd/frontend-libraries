/**
 *
 * GeographySection
 *
 */
import React from 'react';

import './main.css';
import styles from './GeographySection.module.css';

import { GeographySectionProps } from '@wprdc-types/geography-section';
import { Heading } from '@wprdc-components/heading';
import { BreadcrumbItem, Breadcrumbs } from '@wprdc-components/breadcrumbs';
import { GeogBrief, GeographyType } from '@wprdc-types/geo';

export const GeographySection: React.FC<GeographySectionProps> = props => {
  const { geog, geogIsLoading, headingLevel = 1 } = props;

  let hierarchy: GeogBrief[] = [
    {
      name: 'PA',
      title: 'Pennsylvania',
      id: 0,
      geogID: '42',
      geogType: GeographyType.State,
    },
  ];

  return (
    <div className={styles.container}>
      {!!geogIsLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.header}>
            {!!geog && (
              <>
                <Breadcrumbs>
                  {hierarchy.concat(geog.hierarchy.concat(geog)).map(item => (
                    <BreadcrumbItem key={item.name}>
                      {item.title}
                    </BreadcrumbItem>
                  ))}
                </Breadcrumbs>
                <Heading className={styles.heading} level={headingLevel}>
                  {geog.title}
                </Heading>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
