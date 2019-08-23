import React from 'react';
import classnames from 'classnames';
import ArrowDown from '@wix/da-shared-react/pkg/Icons/ArrowDown';
import NativeDropdown, {
  Props as NativeDropdownProps,
} from '@wix/da-shared-react/pkg/Dropdown/NativeDropdown';
import s from './FacetPage.scss';

export interface Props {
  title: string;
  titleClassName?: string;
  arrowClassName?: string;
}

export const MobileFacetDropdown: React.FC<Props & NativeDropdownProps> = ({
  title,
  items,
  onSelect,
  titleClassName,
  arrowClassName,
}) => {
  return (
    <div className={s['native-dropdown-wrap']}>
      <div className={s['native-dropdown-title-wrap']}>
        <div className={classnames(s['native-dropdown-title'], titleClassName)}>
          {title}
        </div>
        <ArrowDown
          className={classnames(s['native-dropdown-arrow'], arrowClassName)}
        />
      </div>
      <NativeDropdown
        onSelect={onSelect}
        items={items}
        className={s['native-dropdown-hidden']}
      />
    </div>
  );
};
MobileFacetDropdown.displayName = 'MobileFacetDropdown';

export default MobileFacetDropdown;
