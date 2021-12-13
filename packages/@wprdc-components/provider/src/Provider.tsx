import React, { Reducer, useContext, useReducer } from 'react';

import { SSRProvider } from '@react-aria/ssr';
import { OverlayProvider } from '@react-aria/overlays';

import { Geog, GeogIdentifier } from '@wprdc-types/geo';
import { GeoAPI } from '@wprdc-connections/geo';
import {
  ProviderAction,
  ProviderContext,
  ProviderProps,
  ProviderState,
} from '@wprdc-types/provider';

const Context = React.createContext<ProviderContext>({
  dispatch: () => {},
  setGeog: () => {},
  fetchAndSetGeog: () => {},
});
Context.displayName = 'ProviderContext';

const defaultReducer: Reducer<ProviderState, ProviderAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'set-mapboxAPIToken':
      return Object.assign({}, state, { mapboxAPIToken: action.payload });
    case 'set-geog':
      return Object.assign({}, state, { geog: action.payload });
    default:
      console.warn(`${action.type} is not a valid action type.`);
      return state;
  }
};

export const Provider: React.FC<ProviderProps> = (props) => {
  const {
    mapboxAPIToken,
    reducer = defaultReducer,
    usingSSR,
    children,
  } = props;

  const [state, dispatch] = useReducer(reducer, { mapboxAPIToken });

  function setGeog(geog: Geog) {
    dispatch({
      type: 'set-geog',
      payload: geog,
    });
  }

  async function fetchAndSetGeog(geogID: GeogIdentifier) {
    const { data } = await GeoAPI.requestGeogDetails(geogID);
    if (!!data) setGeog(data);
    else console.error('No geography found');
  }

  const context: ProviderContext = Object.assign({}, state, {
    dispatch,
    setGeog,
    fetchAndSetGeog,
  });

  if (usingSSR) {
    return (
      <Context.Provider value={context}>
        <SSRProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </SSRProvider>
      </Context.Provider>
    );
  }
  return (
    <Context.Provider value={context}>
      <OverlayProvider>{children}</OverlayProvider>
    </Context.Provider>
  );
};

export function useProvider() {
  return useContext(Context);
}
