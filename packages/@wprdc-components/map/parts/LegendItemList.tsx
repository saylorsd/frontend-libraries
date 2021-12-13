import * as React from 'react';
import '../../../styles/global.css';

import { LegendItemListProps } from '../types';
import { LegendItem } from './LegendItem';

export const LegendItemList: React.FC<LegendItemListProps> = (props) => {
  const { title, items } = props;
  if (!items) return <div />;
  return (
    <div>
      <p className="text-sm">{title}</p>
      <ul>
        {items.map((item) => (
          <li>
            <LegendItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
