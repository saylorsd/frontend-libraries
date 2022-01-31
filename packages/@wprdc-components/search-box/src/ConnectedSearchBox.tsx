import * as React from 'react';
import { Key } from 'react';
import { SearchBox } from './SearchBox';
import { useAsyncList } from '@react-stately/data';
import { ConnectedSearchBoxProps } from '@wprdc-types/search-box';
import { Resource } from '@wprdc-types/shared';
import { ResourceOptionTemplateOptions } from '@wprdc-types/list-box';

export function ConnectedSearchBox<
  T extends Resource,
  O extends object = ResourceOptionTemplateOptions<T>
>(props: ConnectedSearchBoxProps<T, O>) {
  const { connection, label, onSelection, listBoxProps, ...searchBoxProps } =
    props;
  const list = useAsyncList<T>(connection);
  if (!!list.error) console.error(list.error);

  function handleSelection(key: Key) {
    if (!!onSelection) {
      onSelection(list.getItem(key));
    }
  }

  return (
    <SearchBox<T, O>
      label={label}
      items={list.items}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      loadingState={list.loadingState}
      onLoadMore={list.loadMore}
      onSelectionChange={handleSelection}
      listBoxProps={listBoxProps}
      {...searchBoxProps}
    >
      {connection.renderItem}
    </SearchBox>
  );
}

export default ConnectedSearchBox;
