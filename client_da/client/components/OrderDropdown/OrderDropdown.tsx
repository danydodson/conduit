import React from 'react';
import classnames from 'classnames';
import StandardDropdown from '@wix/da-shared-react/pkg/Dropdown/Preset/StandardDropdown';
import { BiEventType, BiLink } from '@wix/da-shared-react/pkg/biLogger';
import { IconSize } from '@wix/da-shared-react/pkg/Icons/IconWrap';
import { OrderOption } from '../../../types/api';
import s from './OrderDropdown.scss';

export interface Props {
  orderOptions?: OrderOption[];
  order?: string;
  className?: string;
  menuClassName?: string;
  buildLinkFromOption?: (any) => string;
  arrowDown?: (className: string) => void;
}

export const OrderDropdown: React.FC<Props> = ({
  orderOptions,
  order,
  className,
  menuClassName,
  buildLinkFromOption,
  arrowDown,
}) => {
  if (!orderOptions || !orderOptions.length) {
    return null;
  }

  return (
    <StandardDropdown
      selectedValue={order}
      items={orderOptions.map(option => ({
        link: buildLinkFromOption ? buildLinkFromOption(option) : option.url,
        value: option.order,
        label: option.title,
        componentClass: BiLink,
        componentProps: {
          biData: {
            evid: BiEventType.SORT_TYPE_SELECT,
            sort_selection: option.order,
          },
        },
      }))}
      className={classnames(s['dropdown'], className)}
      menuClassName={menuClassName}
      toggleClassName={classnames(
        s['facet-dropdown-toggle'],
        s['active-facet']
      )}
      arrowDown={arrowDown}
      arrowSize={IconSize.TINY}
    />
  );
};
OrderDropdown.displayName = 'OrderDropdown';

export default OrderDropdown;
