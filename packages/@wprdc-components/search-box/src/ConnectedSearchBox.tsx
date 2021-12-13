// import * as React from 'react';
// import { Key } from 'react';
// import { SearchBox } from './SearchBox';
// import { useAsyncList } from '@react-stately/data';
// import { SearchBoxConnection } from './types';
//
// export interface ConnectedSearchBoxProps<T> {
//   label?: string;
//   onSelection?: (item: T) => unknown;
//   connection: SearchBoxConnection<T>;
// }
//
// export type PremadeConnectedSearchBoxProps<T extends object> = Omit<ConnectedSearchBoxProps<T>, 'connection'>;
//
// export function ConnectedSearchBox<T extends object>(
//   props: ConnectedSearchBoxProps<T>,
// ) {
//   const { connection, label, onSelection } = props;
//   const list = useAsyncList<T>(connection);
//   if (!!list.error) console.error(list.error);
//
//   function handleSelection(key: Key) {
//     if (!!onSelection) {
//       onSelection(list.getItem(key));
//     }
//   }
//
//   return (
//     <SearchBox<T>
//       label={label}
//       items={list.items}
//       inputValue={list.filterText}
//       onInputChange={list.setFilterText}
//       loadingState={list.loadingState}
//       onLoadMore={list.loadMore}
//       onSelectionChange={handleSelection}
//     >
//       {connection.renderItem}
//     </SearchBox>
//   );
// }
//
// export default ConnectedSearchBox;
