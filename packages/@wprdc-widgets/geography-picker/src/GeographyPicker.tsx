import * as React from 'react';
import { useMemo, useState } from 'react';

import './main.css';
import styles from './GeographyPicker.module.css';

import { RiRoadMapFill as MapIcon } from 'react-icons/ri';
import { useField } from '@react-aria/label';

import { Tooltip } from '@wprdc-components/tooltip';
import { GeogBrief, GeographyType } from '@wprdc-types/geo';

import { GeographyPickerProps } from './types';

import GeographyPickerMenu from './GeographyPickerMenu';

export function GeographyPicker(props: GeographyPickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [geog, setGeog] = useState<GeogBrief>();

  let { labelProps, fieldProps, descriptionProps, errorMessageProps } =
    useField({ ...props, labelElementType: 'span' });

  const { onSelection } = props;

  const value: string | undefined = useMemo(
    () => geog && JSON.stringify(geog),
    [geog]
  );

  const displayValue: string | undefined = useMemo(
    () => (geog ? getGeogIDTitle(geog) : 'Pick a geography'),
    [geog]
  );

  function handleSelection(geog: GeogBrief) {
    setGeog(geog);
    if (!!onSelection) {
      onSelection(geog);
    }
    setIsOpen(false);
  }

  return (
    <div className={styles.container}>
      {props.label && (
        <div className={styles.label}>
          <span {...labelProps}>{props.label}</span>
        </div>
      )}
      <input hidden aria-hidden="true" {...fieldProps} value={value} />
      <Tooltip
        size="full"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={'Select an area'}
        content={
          <GeographyPickerMenu
            selectedGeog={geog}
            onSelection={handleSelection}
          />
        }
      >
        <div className={styles.input}>
          <div className={styles.icon}>
            <MapIcon aria-hidden="true" className="w-5 h-5 text-gray-500" />
          </div>
          <div className={styles.valueBox}>{displayValue}</div>
        </div>
      </Tooltip>
      {props.description && (
        <div {...descriptionProps} className={styles.description}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} className={styles.error}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export default GeographyPicker;

/**
 * Returns string containing the common name of a location.
 * @param geog
 */
export function getGeogIDTitle(geog: GeogBrief): string {
  switch (geog.geogType) {
    case GeographyType.County:
      return `${geog.name} County`;
    case GeographyType.Tract:
      return `Tract ${geog.geogID}`;
    case GeographyType.BlockGroup:
      return `Block Group ${geog.geogID}`;
    default:
      return geog.name || '';
  }
}
