/**
 * Map
 *
 * Display stuff on map :check:
 *
 */

import * as React from 'react';

import styles from './Map.module.css';

import InteractiveMap, {
  Layer,
  LayerProps,
  MapEvent,
  NavigationControl,
  Source,
  SourceProps,
  ViewportProps,
} from 'react-map-gl';

import {
  LayerPanelVariant,
  PopupContentProps,
  ViewportOptions,
} from '@wprdc-types/map';

import {
  MouseEventHandler,
  MapPluginToolbox,
  ConnectableMapProps,
  ConnectedLayerPanelProps,
} from '@wprdc-types/connections';

import { ColorScheme } from '@wprdc-types/shared';
import { useProvider } from '@wprdc-components/provider';

import { basemaps, DEFAULT_BASEMAP_STYLE, DEFAULT_VIEWPORT } from './settings';
import {
  handleMouseEventForToolboxes,
  hasFeatures,
  makeContentProps,
} from './utils';

import { LayerPanel } from './layerpanel';
import { Legend, LegendItem } from './legend';
import { HoverPopup, ClickPopup } from './popup';
import { useMemo } from 'react';

// from 'react-map-gl'
type InteractiveState = Partial<{
  startPanLngLat: Array<number>;
  startZoomLngLat: Array<number>;
  startBearing: number;
  startPitch: number;
  startZoom: number;
}>;

export const userPrefersDark =
  !(typeof window === 'undefined') &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const DEFAULT_COLOR_SCHEME = userPrefersDark
  ? ColorScheme.Dark
  : ColorScheme.Light;

export function Map({
  connections = [],
  connectionHookArgs = {},

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
}: ConnectableMapProps) {
  // context record to share data across plugins
  const [pluginContext, setPluginContext] = React.useState<Record<string, any>>(
    {}
  );
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

  // if any connections are provided, run through
  const toolboxes: MapPluginToolbox<any, any>[] = connections.map(
    (connection) => {
      const hookArgs = connectionHookArgs[connection.name] || {};
      return connection.use({
        connection,
        ...hookArgs,
        context: pluginContext,
        setContext: setPluginContext,
      });
    }
  );

  // Wrappers around commonly-used event handlers
  // ------------------------------------------------------------------------
  const handleViewportChange = (
    viewState: ViewportProps,
    interactionState: InteractiveState,
    oldViewState: ViewportProps
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
    eventType,
    event,
    Popup,
    setPopup,
    CustomContentComponent,
    callback
  ) => {
    const _isOverInteractiveLayer = (event: MapEvent) =>
      !!event.features &&
      !!interactiveLayerIDs &&
      interactiveLayerIDs.includes(event.features[0].layer.id);

    if (useFeaturelessEvents || hasFeatures(event)) {
      if (_isOverInteractiveLayer(event)) {
        const [lng, lat] = event.lngLat;
        // allow for outside provided content
        let customContents: React.ReactNode = undefined;
        if (!!CustomContentComponent) {
          const contentProps: PopupContentProps = makeContentProps(event);
          customContents = <CustomContentComponent {...contentProps} />;
        }
        const { toolboxItems, toolboxContents } = handleMouseEventForToolboxes(
          toolboxes,
          event,
          eventType
        );

        if (!!customContents || (!!toolboxContents && !!toolboxContents.length))
          setPopup(
            <Popup longitude={lng} latitude={lat}>
              {customContents}
              {toolboxContents}
            </Popup>
          );
        if (!!callback) {
          callback(event, toolboxes, toolboxItems);
        }
      } else {
        setPopup(null);
      }
    }
  };
  const handleHover = (event: MapEvent) => {
    handleMouseEvent(
      'hover',
      event,
      HoverPopup,
      setHoverPopup,
      CustomHoverContents,
      onHover
    );
  };

  const handleClick = (event: MapEvent) => {
    console.debug('Map Click', event);
    return handleMouseEvent(
      'click',
      event,
      ClickPopup,
      setClickPopup,
      CustomClickContents,
      onClick
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
    () =>
      _interactiveLayerIDs.concat(
        toolboxes.reduce((intIDs, tb) => {
          if (!!tb.interactiveLayerIDs)
            return [...intIDs, ...tb.interactiveLayerIDs];
          return intIDs;
        }, [] as string[])
      ),
    [_interactiveLayerIDs, connections]
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

  const { tbSources, tbLayers } = useMemo(() => {
    return toolboxes.reduce(
      (result, tb) => {
        let tmpS = result.tbSources;
        let tmpL = result.tbLayers;
        if (!!tb.sources) tmpS = [...result.tbSources, ...tb.sources];
        if (!!tb.layers) tmpL = [...result.tbLayers, ...tb.layers];
        return { tbSources: tmpS, tbLayers: tmpL };
      },
      {
        tbSources: [] as SourceProps[],
        tbLayers: [] as LayerProps[],
      }
    );
  }, [toolboxes, connections, connectionHookArgs]);

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
          {!!tbSources &&
            tbSources.map((source) => <Source key={source.id} {...source} />)}
          {!!tbSources &&
            !!tbLayers &&
            tbLayers.map((layer) => <Layer key={layer.id} {...layer} />)}

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
}

Map.defaultProps = {
  basemapStyle: 'light',
  layerPanelVariant: LayerPanelVariant.Inside,
  colorScheme: DEFAULT_COLOR_SCHEME,
};

const OutsideLayerPanel = (props: ConnectedLayerPanelProps) => (
  <div className={styles.outsideLayerPanel}>
    <LayerPanel {...props} />
  </div>
);

const InsideLayerPanel = (props: ConnectedLayerPanelProps) => (
  <div className={styles.insideLayerPanel}>
    <LayerPanel {...props} />
  </div>
);

export default Map;
