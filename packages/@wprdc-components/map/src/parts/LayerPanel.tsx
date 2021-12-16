import * as React from 'react';
import '../main.css';

import { _useMapControl as useMapControl } from 'react-map-gl';

import { CollectionElement, Selection } from '@react-types/shared';

import { WithToolboxes } from '@wprdc-types/map';

export interface LayerPanelProps extends WithToolboxes {}

export const LayerPanel: React.FC<LayerPanelProps> = (props) => {
  const { toolboxes } = props;

  const { containerRef } = useMapControl({
    captureScroll: true,
    captureDrag: true,
    captureClick: true,
    captureDoubleClick: true,
    capturePointerMove: true,
  });

  const handleSelection =
    (name: string, onSelection: (items: Selection) => void) =>
    (keys: string | string[]) => {
      const k = typeof keys === 'string' ? [keys] : keys;
      const items = splitKeys(k)[name];
      onSelection(items);
    };

  // Different sections for each project.
  let sections: CollectionElement<object>[] = [];

  toolboxes.forEach((tb) => sections.push(tb.layerPanelSection));

  if (!sections || !sections.length) return null;

  return <div ref={containerRef}>{sections}</div>;
};

function splitKeys(
  keys: string[],
): Record<'menu' | 'assets' | string, Selection> {
  let record: Record<'menu' | 'assets' | 'profiles', Set<string>> = {
    menu: new Set() as Set<string>,
    assets: new Set() as Set<string>,
    profiles: new Set() as Set<string>,
  };

  for (let key of Array.from(keys)) {
    const [section, name] = key.split('/', 2);
    record[section as 'menu' | 'assets' | 'profiles'].add(name);
  }

  return record;
}
