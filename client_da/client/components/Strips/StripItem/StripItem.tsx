import React, { useContext } from 'react';
import { FacetItemTypes } from '../../FacetStream/types';
import ItemCard from '../../ItemCard';
import { MobileContext } from '@wix/da-shared-react/pkg/Context';
import { FacetItem } from '../../../../types/api';
import { Dims } from '@wix/da-shared-react/pkg/Measured';

export interface Props {
  item: FacetItem;
  itemIndex: number;
  type: FacetItemTypes;
  elementSize?: Dims;
}

function getStripItemSizeByType(type: FacetItemTypes, isMobile = false) {
  switch (type) {
    case FacetItemTypes.Deviation:
      const width = 281;
      const height = 255;
      return { width, height };
    case FacetItemTypes.Gallection:
      return { height: 458, width: isMobile ? 375 : 438 };
    case FacetItemTypes.Group:
      return {
        width: 375,
        height: 220,
      };
    case FacetItemTypes.User:
      return {
        width: 288,
        height: 299,
      };

    default:
      return { width: 375, height: 340 };
  }
}

export const StripItem: React.FC<Props> = ({
  type,
  item,
  itemIndex,
  elementSize,
}) => {
  const isMobile = useContext(MobileContext);

  const size = elementSize || getStripItemSizeByType(type, isMobile);

  return (
    <ItemCard
      itemIndex={itemIndex}
      type={type}
      item={item}
      style={size}
      width={size.width}
      height={size.height}
      inclusiveFooter
      responsive
    />
  );
};
StripItem.displayName = 'StripItem';

export default StripItem;
