import React from 'react';
import {
  PapiDeviation,
  PapiUser,
  PapiGallection,
  PapiGroup,
} from '@wix/da-types-papi';
import ShopThumb, {
  ShopThumbType,
} from '@wix/da-shared-react/pkg/DeviationViews/Thumb/Shop';
import StandardThumb from '@wix/da-shared-react/pkg/DeviationViews/Thumb/Standard';
import MiniArtistCard from '@wix/da-shared-react/pkg/MiniArtistCard';
import CollectionCard from '@wix/da-shared-react/pkg/CollectionCard';
import MiniGroupCard from '@wix/da-shared-react/pkg/MiniGroupCard';
import { FacetItemTypes } from '../FacetStream/types';
import { FacetItem } from '../../../types/api';
import { BiLoggerContextProvider } from '@wix/da-shared-react/pkg/biLogger';
import s from './ItemCard.scss';

export interface Props {
  type: FacetItemTypes;
  item: FacetItem;
  itemIndex: number;
  width: number;
  height: number;
  style?: React.CSSProperties;
  inclusiveFooter?: boolean;
  responsive?: boolean;
  dataHook?: string;
}

export const ItemCard: React.FC<Props> = ({
  type,
  item,
  itemIndex,
  style = {},
  inclusiveFooter,
  responsive,
  width,
  height,
  dataHook,
}) => {
  let result: JSX.Element;

  switch (type) {
    case FacetItemTypes.Deviation:
      const deviation = item as PapiDeviation;
      const { commission } = deviation;
      if (commission) {
        result = (
          <ShopThumb
            deviation={deviation}
            width={width}
            height={height}
            type={ShopThumbType.COMMISSION}
            style={style}
          />
        );
      } else {
        result = (
          <StandardThumb
            deviation={deviation}
            width={width}
            height={height}
            style={style}
            responsive={responsive}
          />
        );
      }
      break;
    case FacetItemTypes.User:
      result = (
        <MiniArtistCard
          user={item as PapiUser}
          style={style}
          dataHook={dataHook}
        />
      );
      break;
    case FacetItemTypes.Gallection:
      result = (
        <CollectionCard
          gallection={item as PapiGallection}
          width={width}
          height={height}
          style={style}
          inclusiveFooter={inclusiveFooter}
        />
      );
      break;
    case FacetItemTypes.Group:
      result = (
        <MiniGroupCard
          className={s['group-card']}
          style={style}
          group={item as PapiGroup}
          dataHook={dataHook}
        />
      );
      break;
    default:
      return null;
  }

  return (
    <BiLoggerContextProvider value={{ _rankIndex: itemIndex }}>
      {result}
    </BiLoggerContextProvider>
  );
};
ItemCard.displayName = 'ItemCard';

export default ItemCard;
