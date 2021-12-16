/**
 * Map
 *
 * Display stuff on map :check:
 *
 */

import React, { useState } from 'react';

import './main.css';
import styles from './Map.module.css';

import InteractiveMap, {
  Layer,
  MapEvent,
  NavigationControl,
  Source,
  ViewportProps,
} from 'react-map-gl';
import { InteractiveState } from 'react-map-gl/src/utils/map-state';

import {
  LayerPanelVariant,
  MapProps,
  PopupContentProps,
  ViewportOptions,
  MouseEventHandler,
  MapPluginToolbox,
} from '@wprdc-types/map';
import { ColorScheme } from '@wprdc-types/shared';
import { useProvider } from '@wprdc-components/provider';

import { basemaps, DEFAULT_BASEMAP_STYLE, DEFAULT_VIEWPORT } from './settings';
import { hasFeatures, makeContentProps } from './utils';

import { LayerPanel, LayerPanelProps } from './parts/LayerPanel';
import { Legend } from './parts/Legend';
import { LegendItem } from './parts/LegendItem';
import { HoverPopup } from './parts/HoverPopup';
import { ClickPopup } from './parts/ClickPopup';

export const userPrefersDark =
  !(typeof window === 'undefined') &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const DEFAULT_COLOR_SCHEME = userPrefersDark
  ? ColorScheme.Dark
  : ColorScheme.Light;

export const Map: React.FC<MapProps> = ({
  connections,
  connectionHookArgs,

  layerPanelVariant,
  colorScheme,
  hideLegendTitle,
  CustomHoverContents,
  CustomClickContents,

  // old stuff - still good just old
  mapboxApiAccessToken,
  defaultViewport,
  basemapStyle,
  sources,
  layers,
  children,
  onViewportChange,
  onHover,
  onClick,
  optionsMenu,
  legendItems,
  useFeaturelessEvents,
  interactiveLayerIds: _interactiveLayerIDs = [],
  ...otherInteractiveMapProps
}) => {
  // context record to share data across plugins
  const [pluginContext, setPluginContext] = useState<Record<string, any>>({});
  const [toolboxes, setToolboxes] =
    useState<MapPluginToolbox<any, any>[]>(null);
  // if any connections are provided, run through
  // todo: get rid of the connectionHookArgs and the process for
  //  getting a connection involve a closure
  //  eg: makeConnection(args: ConnectionHookArgs) => MapPluginConnection
  if (!!connections) {
    connections.forEach((connection) =>
      connection.use({
        connection,
        ...connectionHookArgs,
        context: pluginContext,
        setContext: setPluginContext,
      }),
    );
  }

  // Internal state
  // ------------------------------------------------------------------------
  const [viewport, setViewport] = React.useState<ViewportOptions>({
    ...DEFAULT_VIEWPORT,
    ...defaultViewport,
  });
  const [hoverPopup, setHoverPopup] = React.useState<React.ReactNode>();
  const [clickPopup, setClickPopup] = React.useState<React.ReactNode>();

  // Theming
  // ------------------------------------------------------------------------
  const mapStyle = basemapStyle
    ? basemaps[basemapStyle]
    : DEFAULT_BASEMAP_STYLE;

  // Wrappers around commonly-used event handlers
  // ------------------------------------------------------------------------
  const handleViewportChange = (
    viewState: ViewportProps,
    interactionState: InteractiveState,
    oldViewState: ViewportProps,
  ) => {
    if (onViewportChange) {
      onViewportChange(viewState, interactionState, oldViewState);
    }
    setViewport(viewState as ViewportOptions);
  };

  /**
   * Handle the primary Mouse Events over the Map (click and hover for now).
   */
  const handleMouseEvent: MouseEventHandler = (
    event,
    Popup,
    setPopup,
    connections,
    CustomContentComponent,
    callback,
  ) => {
    const _isOverInteractiveLayer = (event: MapEvent) =>
      !!event.features &&
      !!interactiveLayerIDs &&
      interactiveLayerIDs.includes(event.features[0].layer.id);

    if (useFeaturelessEvents || hasFeatures(event)) {
      if (_isOverInteractiveLayer(event)) {
        const [lng, lat] = event.lngLat;
        let customContents: React.ReactNode = undefined;
        if (!!CustomContentComponent) {
          const contentProps: PopupContentProps = makeContentProps(event);
          customContents = <CustomContentComponent {...contentProps} />;
        }
        setPopup(
          <Popup longitude={lng} latitude={lat} connections={connections}>
            {customContents}
          </Popup>,
        );
        if (!!callback) {
          callback(event, connections);
        }
      } else {
        setPopup(null);
      }
    }
  };

  const handleHover = (event: MapEvent) => {
    handleMouseEvent(
      event,
      HoverPopup,
      setHoverPopup,
      connections,
      CustomHoverContents,
      onHover,
    );
  };

  const handleClick = (event: MapEvent) => {
    return handleMouseEvent(
      event,
      ClickPopup,
      setClickPopup,
      connections,
      CustomClickContents,
      onClick,
    );
  };

  const handleMouseLeave = () => {
    if (hoverPopup) setHoverPopup(null);
  };

  // Prepare for render
  // ------------------------------------------------------------------------

  // get mapbox api key, preferring prop over context
  const { mapboxAPIToken: ctxToken } = useProvider();
  const mapboxToken: string | undefined = mapboxApiAccessToken || ctxToken;

  // update the full set of interactive layer IDs when any change.
  const interactiveLayerIDs = React.useMemo(
    () => _interactiveLayerIDs.concat(),
    [_interactiveLayerIDs, connections],
  );

  const customLegendContent = React.useMemo(() => {
    if (!!legendItems) {
      return legendItems.map((itemProps) => <LegendItem {...itemProps} />);
    }
    return null;
  }, [legendItems]);

  // only show legend if there is something to put in it
  // i.e. there's custom content, or any of the toolboxes have legend items
  const showLegend =
    !!customLegendContent ||
    !!toolboxes.find((tb) => !!tb.legendItems && !!tb.legendItems.length);

  return (
    <div className={styles.container}>
      {layerPanelVariant === LayerPanelVariant.Left ? (
        <OutsideLayerPanel toolboxes={toolboxes} />
      ) : (
        <div />
      )}
      <div className={styles.mapContainer}>
        <InteractiveMap
          {...viewport}
          mapboxApiAccessToken={mapboxToken}
          mapStyle={mapStyle}
          onHover={handleHover}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          onViewportChange={handleViewportChange}
          interactiveLayerIds={interactiveLayerIDs}
          {...otherInteractiveMapProps}
          className={styles.map}
          width="100%"
          height="100%"
        >
          {/* Plugin layers */}
          {Object.values(toolboxes).map((tb) => tb.mapSection)}

          {/* Custom Layers */}
          {!!sources &&
            sources.map((source) => <Source key={source.id} {...source} />)}
          {!!sources &&
            !!layers &&
            layers.map((layer) => (
              <Layer key={layer.id} id={layer.id} {...layer} />
            ))}

          {children}
          {hoverPopup}
          {clickPopup}

          {layerPanelVariant === LayerPanelVariant.Inside && (
            <InsideLayerPanel toolboxes={toolboxes} />
          )}

          <div className={styles.navControls}>
            <NavigationControl />
          </div>

          <div className={styles.optionsMenu}>{optionsMenu}</div>

          <div className={styles.legend}>
            {showLegend && (
              <Legend
                title={hideLegendTitle ? '' : 'legend'}
                toolboxes={toolboxes}
              >
                {customLegendContent}
              </Legend>
            )}
          </div>
        </InteractiveMap>
      </div>
      {layerPanelVariant === LayerPanelVariant.Right ? (
        <OutsideLayerPanel toolboxes={toolboxes} />
      ) : (
        <div />
      )}
    </div>
  );
};

Map.defaultProps = {
  basemapStyle: 'light',
  layerPanelVariant: LayerPanelVariant.Inside,
  colorScheme: DEFAULT_COLOR_SCHEME,
};

const OutsideLayerPanel = (props: LayerPanelProps) => (
  <div className={styles.outsideLayerPanel}>
    <LayerPanel {...props} />
  </div>
);

const InsideLayerPanel = (props: LayerPanelProps) => (
  <div className={styles.insideLayerPanel}>
    <LayerPanel {...props} />
  </div>
);

export default Map;
