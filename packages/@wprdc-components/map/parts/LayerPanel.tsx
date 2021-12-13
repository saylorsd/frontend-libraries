import * as React from 'react';
import '../../../styles/global.css';
import { CollectionElement, Selection } from '@react-types/shared';

import { _useMapControl as useMapControl } from 'react-map-gl';
import { AssetToolbox, MenuToolbox, ProfilesToolbox } from '../types';
import { Radio, RadioGroup } from '../../RadioGroup';
import { Checkbox, CheckboxGroup } from '../../CheckboxGroup';

export interface LayerPanelProps {
  menuToolbox: MenuToolbox;
  assetToolbox: AssetToolbox;
  profilesToolbox: ProfilesToolbox;
}

export const LayerPanel: React.FC<LayerPanelProps> = (props) => {
  const { assetToolbox, menuToolbox, profilesToolbox } = props;

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
  // Only show menu layer controls if there are more than 1 layers
  if (
    !!menuToolbox &&
    !!menuToolbox.layerItems &&
    menuToolbox.layerItems.length > 1
  ) {
    //todo: make the generation of these a property of the project's connection in the hooks
    sections.push(
      <div>
        <RadioGroup
          label="Select a menu layer"
          aria-label="select the geographic menu layer to display"
          onChange={handleSelection('menu', menuToolbox.handleLayerSelection)}
        >
          {menuToolbox.layerItems.map((item) => (
            <Radio key={`menu/${item.id}`} value={`menu/${item.id}`}>
              {item.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (!!assetToolbox.layerItems && !!assetToolbox.layerItems.length)
    sections.push(
      <div className="pt-2">
        <CheckboxGroup
          label="Select neighborhood assets to display"
          aria-label="select neighborhood asset layers to display"
          onChange={handleSelection(
            'assets',
            assetToolbox.handleLayerSelection
          )}
        >
          {assetToolbox.layerItems.map((item) => (
            <Checkbox key={`assets/${item.name}`} value={`assets/${item.name}`}>
              {item.title}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    );

  if (!!profilesToolbox.layerItems && !!profilesToolbox.layerItems.length)
    sections.push(
      <div>
        <RadioGroup
          label="Select a menu layer"
          aria-label="select the geographic menu layer to display"
          onChange={handleSelection(
            'profiles',
            profilesToolbox.handleLayerSelection
          )}
        >
          {profilesToolbox.layerItems.map((item) => (
            <Radio key={`profiles/${item.id}`} value={`profiles/${item.id}`}>
              {item.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    );

  if (!sections || !sections.length) return null;

  return <div ref={containerRef}>{sections}</div>;
};

function splitKeys(
  keys: string[]
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
