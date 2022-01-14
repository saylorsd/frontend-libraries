/**
 *
 * ActionDialog
 *
 */
import React from 'react';
import { DataVizID } from '../../../../types';
import Dialog from '../../../Dialog';
import { Divider } from '../../../Divider';
import { Link } from '../../../Link';

interface Props {
  onClose: () => void;
  dataVizID: DataVizID;
}

export function UserReportDialog(props: Props) {
  const { onClose, dataVizID } = props;
  const emailLink = `mailto:wprdc@pitt.edu?subject=Profiles data viz issue - ${dataVizID.name}`;
  return (
    <Dialog title="Report a Data Error" onClose={onClose}>
      <Divider />
      <div>
        <p>
          Is there a problem with the his data visualization? Please{' '}
          <Link href={emailLink}>let us know</Link>.
        </p>
      </div>
    </Dialog>
  );
}
