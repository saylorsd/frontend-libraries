import * as React from 'react';
import './main.css';
import './DemographicsTable.module.css';

import { TableStyle } from '@wprdc-types/viz';
import { TableVizProps } from '@wprdc-types/viz';
import DemographicsTable from './DemographicsTable';

/**
 * Renders a table of data.
 * @constructor
 */
export function Table(props: TableVizProps) {
  const { dataViz } = props;

  if (!dataViz.data) return <div />;

  // todo: select render component based on type
  switch (dataViz.options.tableStyle) {
    case TableStyle.Demographics:
      return <DemographicsTable {...props} />;
    default:
      return <DemographicsTable {...props} />;
  }
}
