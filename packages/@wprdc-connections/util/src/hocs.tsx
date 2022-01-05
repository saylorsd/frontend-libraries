import React from 'react';
import {
  ListConnection,
  ListConnectableComponentProps,
  ListConnectableComponent,
} from '@wprdc-types/shared';

export function withListConnection<
  P extends ListConnectableComponentProps<T>,
  T extends Resource,
>(Component: ListConnectableComponent<T>, connection: ListConnection<T>) {
  return (props: Omit<P, 'connection'>) => (
    <Component {...props} connection={connection} />
  );
}
