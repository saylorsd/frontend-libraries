/**
 *
 * ApiDialog
 *
 */
import React from 'react';
import { DataVizBase, Downloaded } from '../../../../types';
import { Dialog } from '../../../Dialog';
import { Divider } from '../../../Divider';
import { Link } from '../../../Link';

interface Props {
  onClose: () => void;
  dataViz: Downloaded<DataVizBase>;
}

export function ApiDialog(props: Props) {
  const { onClose, dataViz } = props;
  const { id, geog } = dataViz;
  const host = 'https://api.profiles.wprdc.org';
  const apiUrl = `${host}/data-viz/${id}/?geogType=${geog.geogType}&geogID=${geog.geogID}`;

  return (
    <Dialog title="Use this data in your app" onClose={onClose}>
      <Divider />
      <div>
        <Link href={apiUrl}>{apiUrl}</Link>
      </div>
    </Dialog>
  );
}
