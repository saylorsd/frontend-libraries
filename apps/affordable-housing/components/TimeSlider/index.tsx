/**
 *
 * TimeSlider
 *
 */
import * as React from 'react';
import { RefObject } from 'react';
import {
  mergeProps,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
} from 'react-aria';
import { SliderState, useSliderState } from 'react-stately';
import { AriaSliderProps, AriaSliderThumbProps } from '@react-types/slider';
import styles from './TimeSlider.module.css';

interface Props extends AriaSliderProps {
  formatOptions?: Intl.NumberFormatOptions;
  valueFormatter?: (value: number) => string;
}

export function TimeSlider(props: Props) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  );

  return (
    <div {...groupProps} className={styles.group}>
      {/* Create a flex container for the label and output element. */}
      <div className={styles.text}>
        {props.label && (
          <label {...labelProps} className={styles.label}>
            {props.label}
          </label>
        )}
        <output {...outputProps} className={styles.output}>
          {!!props.valueFormatter
            ? props.valueFormatter(state.getThumbValue(0))
            : state.getThumbValueLabel(0)}
        </output>
      </div>
      {/* The track element holds the visible track line and the thumb. */}
      <div {...trackProps} ref={trackRef} className={styles.track}>
        <div className={styles.trackLine} />
        <Thumb index={0} state={state} trackRef={trackRef} />
      </div>
    </div>
  );
}

interface ThumbProps extends AriaSliderThumbProps {
  state: SliderState;
  trackRef: RefObject<HTMLDivElement>;
}

function Thumb(props: ThumbProps) {
  let { state, trackRef, index } = props;
  let inputRef = React.useRef(null);
  let { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state,
  );

  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      className={styles.thumbWrapper}
      style={{
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
    >
      <div
        {...thumbProps}
        className={styles.thumb}
        style={{
          backgroundColor: isFocusVisible
            ? 'orange'
            : state.isThumbDragging(index)
            ? 'dimgrey'
            : '#77b337',
        }}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </div>
    </div>
  );
}
