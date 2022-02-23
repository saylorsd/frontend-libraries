import '../styles/globals.css';

import { Provider } from '@wprdc/toolkit';
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MAPBOX_KEY =
  'pk.eyJ1Ijoic3RldmVuZHNheWxvciIsImEiOiJja295ZmxndGEwbGxvMm5xdTc3M2MwZ2xkIn0' +
  '.WDBLMZYfh-ZGFjmwO82xvw';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider usingSSR mapboxAPIToken={MAPBOX_KEY}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
