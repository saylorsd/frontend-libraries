export { GeoAPI } from './api';
export * from './hooks';
export * from './list';
export * from './map';

// todo: move to components? make component peer dep?
//
// export const makeGeogComboBox = (geogType: GeographyType) =>
//   withConnection<GeogBrief>(new GeographyConnection(geogType));

//export const makeGeogSearchBox = (geogType: GeographyType) =>
//   withConnection<GeogBrief>(new GeographyConnection(geogType));

// const GeogSearchBox = withConnection<GeogBrief>(geographyConnection);

//export const GeogTypeSearchBox = withConnection<GeogLevel>(
//   geographyTypeConnection
// );
