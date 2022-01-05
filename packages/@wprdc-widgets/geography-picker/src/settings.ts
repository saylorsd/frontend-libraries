import { GeogLevel, GeographyType } from '@wprdc-types/geo';

// noinspection SqlResolve
export const MENU_LAYERS: GeogLevel[] = [
  {
    id: GeographyType.CountySubdivision,
    name: 'County Subdivision',
    tableName: 'census_county_subdivision',
    cartoSql:
      "SELECT *, name as map_name, 'countySubdivision' as geogType, geoid as geogID FROM census_county_subdivision  WHERE statefp = '42' AND countyfp IN ('003','019','128','007','005','063','129','051','059','125','073')",
    description: 'Townships, municipalities, boroughs and cities.',
    defaultGeog: {
      id: 16190,
      name: 'Pulaski',
      title: 'Pulaski',
      geogType: GeographyType.CountySubdivision,
      geogID: '4207362904',
    },
  },
  {
    id: GeographyType.County,
    name: 'County',
    tableName: 'census_county',
    cartoSql:
      "SELECT *, name as map_name, 'county' as geogType, geoid as geogID FROM census_county  WHERE statefp = '42' AND countyfp IN ('003','019','128','007','005','063','129','051','059','125','073')",
    description: 'Largest subdivision of a state.',
    defaultGeog: {
      id: 31,
      name: 'Randolph',
      title: 'Randolph County',
      geogType: GeographyType.County,
      geogID: '05121',
    },
  },
  {
    id: GeographyType.Neighborhood,
    name: 'Neighborhood',
    tableName: 'pgh_neighborhoods',
    cartoSql:
      "SELECT *, name as map_name, 'neighborhood' as geogType, geoid as geogID FROM pgh_neighborhoods  ",
    description: 'Official City of Pittsburgh neighborhood boundaries',
    defaultGeog: {
      id: 87674,
      name: 'Lincoln Place',
      title: 'Lincoln Place',
      geogType: GeographyType.Neighborhood,
      geogID: 'pgh-hood-46',
    },
  },
  {
    id: GeographyType.ZCTA,
    name: 'Zip Code',
    tableName: 'profiles_zip_codes',
    cartoSql:
      "SELECT *, name as map_name, 'zcta' as geogType, geoid as geogID FROM profiles_zip_codes  WHERE st_coveredby(the_geom, (select the_geom from profiles_extent))",
    description: 'The area covered by a postal Zip code.',
    defaultGeog: {
      id: 54526,
      name: '36083',
      title: '36083',
      geogType: GeographyType.ZCTA,
      geogID: '36083',
    },
  },
  {
    id: GeographyType.Tract,
    name: 'Tract',
    tableName: 'census_tract',
    cartoSql:
      "SELECT *, name as map_name, 'tract' as geogType, geoid as geogID FROM census_tract  WHERE statefp = '42' AND countyfp IN ('003','019','128','007','005','063','129','051','059','125','073')",
    description: 'Drawn to encompass ~2500-8000 people',
    defaultGeog: {
      id: 12973,
      name: '8006',
      title: 'Tract 8006',
      geogType: GeographyType.Tract,
      geogID: '42129800600',
    },
  },
  {
    id: GeographyType.BlockGroup,
    name: 'Block Group',
    tableName: 'census_blockgroup',
    cartoSql:
      "SELECT *, name as map_name, 'blockGroup' as geogType, geoid as geogID FROM census_blockgroup  WHERE statefp = '42' AND countyfp IN ('003','019','128','007','005','063','129','051','059','125','073')",
    description: 'Smallest geographical unit w/ ACS sample data.',
    defaultGeog: {
      id: 3234,
      name: '1',
      title: 'Block Group 1',
      geogType: GeographyType.BlockGroup,
      geogID: '420171055051',
    },
  },
];
