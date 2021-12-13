/**
 *
 * Spinner types
 *
 **/
import { LoaderHeightWidthRadiusProps } from 'react-spinners/interfaces';
import { SizeCategory } from '@wprdc-types/shared';

export interface SpinnerProps extends LoaderHeightWidthRadiusProps {
  size?: SizeCategory;
}
