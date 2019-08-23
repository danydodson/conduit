import React from 'react';
import ArrowDown from '@wix/da-shared-react/pkg/Icons/ArrowDown';
import NativeDropdown from '@wix/da-shared-react/pkg/Dropdown/NativeDropdown';
import noop from '@wix/da-shared-react/pkg/utils/noop';
import { OrderOption } from '../../../types/api';

import s from './MobileOrderDropdown.scss';

export interface Props {
  title: string;
  order: string;
  orderOptions: OrderOption[];
  onSelect?: (value: any, event: any) => void;
}

export const MobileOrderDropdown: React.FC<Props> = ({
  title,
  order,
  orderOptions,
  onSelect = noop,
}) => {
  return (
    <div className={s['native-dropdown-wrap']}>
      <div className={s['native-dropdown-title-wrap']}>
        <div className={s['native-dropdown-title']}>{title}</div>
        <ArrowDown className={s['native-dropdown-arrow']} />
      </div>
      <NativeDropdown
        onSelect={onSelect}
        items={orderOptions.map(option => ({
          value: option.order,
          label: option.title,
          selected: option.order === order,
        }))}
        className={s['native-dropdown-hidden']}
      />
    </div>
  );
};
MobileOrderDropdown.displayName = 'MobileOrderDropdown';

export default MobileOrderDropdown;
