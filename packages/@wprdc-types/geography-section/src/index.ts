import { Geog, GeographyType } from '@wprdc-types/geo';
import { FC } from 'react';
import { BreadcrumbItemLinkProps } from '@wprdc-types/breadcrumbs';

export interface GeographySectionProps {
  geog?: Geog;
  geogIsLoading?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  LinkComponent?: FC<BreadcrumbItemLinkProps>;
}

export interface ConnectedGeographySectionProps
  extends Omit<GeographySectionProps, 'geog'> {
  geogType?: GeographyType;
  geogID?: string;
}
