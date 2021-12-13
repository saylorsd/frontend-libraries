import county from './county';
import countySubdivision from './countySubdivision';
import tract from './tract';
import blockGroup from './blockGroup';
import { GeographyType } from '../../../types';
import { MenuLayerItem } from '../types';

const availableMenuLayers: Record<GeographyType, MenuLayerItem | null> = {
  [GeographyType.County]: county,
  [GeographyType.CountySubdivision]: countySubdivision,
  [GeographyType.BlockGroup]: blockGroup,
  [GeographyType.Tract]: tract,
  [GeographyType.SchoolDistrict]: null,
  [GeographyType.Neighborhood]: null,
  [GeographyType.ZCTA]: null,
  [GeographyType.State]: null,
};

export default availableMenuLayers;
