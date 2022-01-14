/**
 *
 * ShareDialog
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

export function ShareDialog(props: Props) {
  const { onClose } = props;
  return (
    <Dialog title="Share this Data" onClose={onClose}>
      <Divider />
      <div>
        <p>Sharing options coming soon...</p>
        <p>
          Until then, you can share this link for the indicator:{' '}
          <Link href={window.location.href}>{window.location.href}</Link>
        </p>
      </div>
    </Dialog>
  );
}
