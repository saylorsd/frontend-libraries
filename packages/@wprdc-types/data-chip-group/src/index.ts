/**
 *
 * DataChipGroup types
 *
 **/
import { ReactElement } from 'react';
import { FunctionComponent } from 'react';
import { DataChipProps } from '@wprdc-types/data-chip';

export interface DataChipGroupProps {
  children: ReactElement<FunctionComponent<DataChipProps>>[];
}
