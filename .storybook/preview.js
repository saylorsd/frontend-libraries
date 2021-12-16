import { Provider } from '../packages/@wprdc-components/provider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider
      theme="default"
      mapboxAPIToken="pk.eyJ1Ijoic3RldmVuZHNheWxvciIsImEiOiJja295ZmxndGEwbGxvMm5xdTc3M2MwZ2xkIn0.WDBLMZYfh-ZGFjmwO82xvw"
    >
      <Story />
    </Provider>
  ),
];
