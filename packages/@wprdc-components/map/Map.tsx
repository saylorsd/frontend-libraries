/**
 * Map
 *
 * Display stuff on map :check:
 *
 */

import React from 'react';

import '../../styles/global.css';
import styles from './Map.module.css';

import InteractiveMap, {
  Layer,
  MapEvent,
  NavigationControl,
  Source,
  ViewportProps,
} from 'react-map-gl';

import {
  ExtendedPopupProps,
  LayerPanelVariant,
  MapEventExtras,
  MapProps,
  PopupContentComponent,
  PopupContentProps,
  ViewportOptions,
} from './types';
import { basemaps, DEFAULT_BASEMAP_STYLE, DEFAULT_VIEWPORT } from './settings';
import { hasFeatures, makeContentProps } from './utils';
import { InteractiveState } from 'react-map-gl/src/utils/map-state';
import { LayerPanel, LayerPanelProps } from './parts/LayerPanel';
import { Legend } from './parts/Legend';
import { DEFAULT_COLOR_SCHEME } from '../../util';
import { HoverPopup } from './parts/HoverPopup';
import { ClickPopup } from './parts/ClickPopup';
import { useAssets, useMenu, useProfiles } from './hooks';
import { GeogBrief } from '../../types';
import { AssetMapProperties } from '../../types/communityAssets';
import { LegendItem } from './parts/LegendItem';
import { useProvider } from '../Provider';

export const Map: React.FC<MapProps> = ({
  profilesLayers,
  profilesLayersSelection,
  selectedProfile,

  menuGeogTypes,
  menuGeogTypesSelection,
  selectedGeog,

  assetTypes,
  assetTypesSelection,
  selectedAsset,

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
  // ------------------------------------------------------------------------
  // Built in connections to other WPRDC products
  const assetToolbox = useAssets(
    assetTypes,
    assetTypesSelection,
    selectedAsset
  );

  const menuToolbox = useMenu(
    menuGeogTypes,
    menuGeogTypesSelection,
    selectedGeog
  );

  // when using profiles layers and menu controls, let the menu control what
  // geography to use for profiles
  const ctxGeogType =
    !!menuToolbox.selectedItems && !!menuToolbox.selectedItems.length
      ? menuToolbox.selectedItems[0]
      : undefined;

  const ctxGeog: GeogBrief | undefined = !!ctxGeogType
    ? ctxGeogType.defaultGeog
    : undefined;

  const profilesToolbox = useProfiles(
    profilesLayers,
    profilesLayersSelection,
    selectedProfile,
    { geography: ctxGeog }
  );

  // ------------------------------------------------------------------------
  // Internal state
  const [viewport, setViewport] = React.useState<ViewportOptions>({
    ...DEFAULT_VIEWPORT,
    ...defaultViewport,
  });
  const [hoverPopup, setHoverPopup] = React.useState<React.ReactNode>();
  const [clickPopup, setClickPopup] = React.useState<React.ReactNode>();

  // ------------------------------------------------------------------------
  // Theming
  const mapStyle = basemapStyle
    ? basemaps[basemapStyle]
    : DEFAULT_BASEMAP_STYLE;

  // ------------------------------------------------------------------------
  // Wrappers around commonly-used event handlers
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
  const handleMouseEvent = (
    event: MapEvent,
    Popup: React.FC<ExtendedPopupProps>,
    setPopup: React.Dispatch<JSX.Element | null | undefined>,
    assets: AssetMapProperties[],
    menuGeogs: GeogBrief[],
    CustomContentComponent?: PopupContentComponent,
    callback?: (evt: MapEvent, extras: MapEventExtras) => void
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
          <Popup
            assets={assets}
            menuGeog={menuGeogs[0]}
            longitude={lng}
            latitude={lat}
          >
            {customContents}
          </Popup>
        );
        if (!!callback) {
          callback(event, { assets, menuGeog: menuGeogs[0], profiles: null });
        }
      } else {
        setPopup(null);
      }
    }
  };

  const handleHover = (event: MapEvent) => {
    const assets = assetToolbox.handleHover(event);
    const menuGeogs = menuToolbox.handleHover(event);
    handleMouseEvent(
      event,
      HoverPopup,
      setHoverPopup,
      assets,
      menuGeogs,
      CustomHoverContents,
      onHover
    );
  };

  const handleClick = (event: MapEvent) => {
    const assets = assetToolbox.handleClick(event);
    const menuGeogs = menuToolbox.handleClick(event);
    return handleMouseEvent(
      event,
      ClickPopup,
      setClickPopup,
      assets,
      menuGeogs,
      CustomClickContents,
      onClick
    );
  };

  const handleMouseLeave = () => {
    if (hoverPopup) setHoverPopup(null);
  };

  // ------------------------------------------------------------------------
  // Prepare for render

  // get mapbox api key, preferring prop over context
  const { mapboxAPIToken: ctxToken } = useProvider();
  const mapboxToken: string | undefined = mapboxApiAccessToken || ctxToken;

  // update the full set of interactive layer IDs when any change.
  const interactiveLayerIDs = React.useMemo(
    () =>
      _interactiveLayerIDs.concat(
        menuToolbox.interactiveLayerIDs,
        assetToolbox.interactiveLayerIDs
      ),
    [
      _interactiveLayerIDs,
      menuToolbox.interactiveLayerIDs,
      assetToolbox.interactiveLayerIDs,
    ]
  );

  const toolBoxes = {
    assetToolbox,
    menuToolbox,
    profilesToolbox,
  };

  const customLegendContent = React.useMemo(() => {
    if (!!legendItems) {
      return legendItems.map((itemProps) => <LegendItem {...itemProps} />);
    }
    return null;
  }, [legendItems]);

  // only show legend if there is something to put in it
  const showLegend =
    !!customLegendContent ||
    (!!assetToolbox.legendItems && !!assetToolbox.legendItems.length);

  return (
    <div className={styles.container}>
      {layerPanelVariant === LayerPanelVariant.Left ? (
        <OutsideLayerPanel {...toolBoxes} />
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
          {Object.values(toolBoxes).map((tb) => tb.mapSection)}

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
            <InsideLayerPanel {...toolBoxes} />
          )}

          <div className={styles.navControls}>
            <NavigationControl />
          </div>

          <div className={styles.optionsMenu}>{optionsMenu}</div>

          <div className={styles.legend}>
            {showLegend && (
              <Legend title={hideLegendTitle ? '' : 'legend'} {...toolBoxes}>
                {customLegendContent}
              </Legend>
            )}
          </div>
        </InteractiveMap>
      </div>
      {layerPanelVariant === LayerPanelVariant.Right ? (
        <OutsideLayerPanel {...toolBoxes} />
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
