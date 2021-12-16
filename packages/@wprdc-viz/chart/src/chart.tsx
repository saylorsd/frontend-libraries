/**
 *
 * BarChart
 *
 */
import * as React from 'react';
import './main.css';
import * as vega from 'vega';
import { PlainObject, Vega } from 'react-vega';

import { GeogBrief } from '@wprdc-types/geo';
import {
  ChartViz,
  DataVizBase,
  Downloaded,
  RowRecord,
  TabularData,
  VizProps,
} from '@wprdc-types/viz';

import { specs } from './specs';

interface Props extends VizProps<ChartViz, TabularData> {}

export function Chart(props: Props) {
  const { dataViz, geog, vizHeight, vizWidth } = props;
  const data = prepDataForVega(dataViz);
  const spec = getSpec(dataViz);
  const extraData = getExtraData(dataViz, geog);

  return (
    <Vega
      spec={spec}
      data={{ ...data, ...extraData }}
      height={vizHeight}
      width={vizWidth}
      actions={false}
    />
  );
}

/**
 * Add data tables for styling.
 *
 * @param dataViz
 * @param geog
 */
function getExtraData(dataViz: ChartViz, geog: GeogBrief): PlainObject {
  // used in vega spec to apply highlight style
  let highlight;
  // lookup table for labels
  let labels = dataViz.variables.map((v) => ({ var: v.slug, label: v.name }));

  if (dataViz.staticOptions && dataViz.staticOptions.acrossGeogs) {
    highlight = { highlight: geog.geogID };
    return { highlight, labels };
  }

  return { labels };
}

function getSpec(dataViz: ChartViz): vega.Spec {
  if (dataViz.staticOptions && dataViz.staticOptions.acrossGeogs)
    return specs.acrossGeogs;
  // if (dataViz.layout === 'column') return specs.column;
  return specs.bar;
}

/**
 * Copies and adds human-friendly labels to the tabular data provided from
 * the API and wraps it in the format Vega accepts.
 *
 * @param dataViz
 */
export function prepDataForVega(
  dataViz: Downloaded<ChartViz, TabularData>,
): PlainObject {
  // todo: make lookup table for the labels and toss that into the vega spec!
  const addLabels = makeLabeler(dataViz);
  return { table: dataViz.data.map(addLabels) };
}

/**
 * Returns a function that extracts human-readable labels from `dataViz`.
 * @param {DataVizBase} dataViz - dataViz definition object
 */
const makeLabeler = (dataViz: DataVizBase) => (datum: RowRecord) => {
  // todo: memoize these lookups
  const variable = dataViz.variables.find((v) => v.slug === datum.variable);
  const time = dataViz.timeAxis.timeParts.find((t) => t.slug === datum.time);

  const variableLabel = variable ? variable.name : datum.variable;
  const timeLabel = time ? time.name : datum.time;

  return { ...datum, variableLabel, timeLabel };
};
