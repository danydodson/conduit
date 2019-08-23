import React from 'react';
import { useTranslation } from 'react-i18next';
import { PapiDaBrowseFaceted } from '@wix/da-types-papi';
import MeasuredSlider from '@wix/da-shared-react/pkg/Slider/MeasuredSlider';
import Slider from '@wix/da-shared-react/pkg/Slider';
import DeviationDuperbrowseContext from '@wix/da-shared-react/pkg/Duperbrowse/DeviationDuperbrowseContext';
import { getStripType, getItemId, getStripItems } from '../FacetStream/helper';
import StripItem from './StripItem';
import { FacetItemTypes } from '../FacetStream';

import s from './Strips.scss';

const STRIP_ITEM_WIDTH = 205;
const STRIP_ITEM_HEIGHT = 177;

export interface Props {
  strip: NonNullable<PapiDaBrowseFaceted['strips']>[0];
  isSearchPage?: boolean;
}

export const StripSlider: React.FC<Props> = ({ strip, isSearchPage }) => {
  const { t } = useTranslation();
  const type = getStripType(strip);
  const items = getStripItems(strip);
  if (!items) {
    return null;
  }

  let slider;

  if (!isSearchPage) {
    slider = (
      <Slider
        className={s['slim-slider']}
        scrollBy={STRIP_ITEM_WIDTH * 4}
        permArrows
      >
        {items.map((item, index) => (
          <StripItem
            itemIndex={index}
            key={`strip-${type}-${getItemId(item)}`}
            type={type!}
            item={item}
            elementSize={{
              width: STRIP_ITEM_WIDTH,
              height: STRIP_ITEM_HEIGHT,
            }}
          />
        ))}
      </Slider>
    );
  } else {
    slider = (
      <MeasuredSlider
        renderSliderItems={elementSize => {
          let size = elementSize;
          switch (type) {
            case FacetItemTypes.Gallection:
              size = { height: 340, width: elementSize.width };
              break;
            case FacetItemTypes.Group:
              size = { height: elementSize.height, width: 400 };
              break;
            default:
          }
          return items.map((item, index) => (
            <StripItem
              itemIndex={index}
              key={`strip-${type}-${getItemId(item)}`}
              type={type!}
              item={item}
              elementSize={size}
            />
          ));
        }}
      />
    );
  }

  if (strip.deviations) {
    return (
      <DeviationDuperbrowseContext
        streamId={`deviation-strip-${strip.title
          .toLowerCase()
          .replace(' ', '_')}`}
        deviations={strip.deviations}
        parent={{ title: t('common.browse') }}
      >
        {slider}
      </DeviationDuperbrowseContext>
    );
  }
  return slider;
};
StripSlider.displayName = 'StripSlider';

export default StripSlider;
