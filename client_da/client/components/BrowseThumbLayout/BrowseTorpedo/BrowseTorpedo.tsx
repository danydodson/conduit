import React from 'react';
import { PapiDaBrowseFaceted } from '@wix/da-types-papi';
import { TorpedoProps } from '@wix/da-shared-react/pkg/Torpedo/Torpedo';
import { DeviationTorpedoProps } from '@wix/da-shared-react/pkg/Torpedo/DeviationTorpedo/DeviationTorpedo';
import MeasuredTorpedo from '@wix/da-shared-react/pkg/Torpedo/MeasuredTorpedo';
import { MeasuredCookieType } from '@wix/da-shared-react/pkg/Measured';
import { TorpedoLayoutedItem } from '@wix/da-shared-react/pkg/Torpedo/types';
import { FacetTorpedoItem } from '../../FacetPage/FacetPage';
import { FacetStreamProps } from '../../FacetStream/types';
import { FacetItem } from '../../../../types/api';
import ItemCard from '../../ItemCard';
import Strips from '../../Strips';
import EmptyResult from '../../EmptyResult';
import { getItemId } from '../../FacetStream';
import { facetItemsToTorpedoItems } from '../helpers';

// DeviationTorpedo configuration params
const container = { width: 1024 };
const defaultSize = {
  desktop: { width: 1024, height: 0 },
  mobile: { width: 360, height: 0 },
};

export interface Props extends FacetStreamProps {
  items: FacetItem[];
  onOffsetReached: (offset: number) => void;
  isDuperbrowseActive: boolean;
  pagingMode?: 'scroll' | 'page';
  paginatedBrowse?: boolean;
  isMobile?: boolean;
  strips?: PapiDaBrowseFaceted['strips'];
}

export class BrowseTorpedo extends React.Component<Props> {
  render() {
    const {
      items,
      isDuperbrowseActive,
      isMobile,
      paginatedBrowse,
      pagingMode,
      onOffsetReached,
      strips,
    } = this.props;

    const torpedoProps: Partial<DeviationTorpedoProps & TorpedoProps> = {
      onOffsetReached:
        isDuperbrowseActive || (paginatedBrowse && pagingMode === 'page')
          ? undefined
          : onOffsetReached,
    };

    if (strips && strips.length > 0 && torpedoProps.contentStrip !== null) {
      torpedoProps.contentStrip = <Strips />;
      torpedoProps.contentStripOffset = 2;
      // lets torpedo know which row and the height
      // the strip is at
      torpedoProps.scrollOptimHints = {
        stripExtraHeight: {
          2: 800,
        },
      };
    }

    const torpedoItems = facetItemsToTorpedoItems(items, isMobile);
    if (!torpedoItems || torpedoItems.length === 0) {
      return <EmptyResult />;
    }
    return (
      <MeasuredTorpedo
        items={torpedoItems}
        renderItem={this.renderTorpedoItem}
        container={container}
        cookieType={MeasuredCookieType.BROWSE}
        cookieDim={'width'}
        defaultSize={defaultSize}
        enableScrollVisibilityOptimisation={true}
        {...torpedoProps}
      />
    );
  }

  renderTorpedoItem = (
    props: TorpedoProps,
    {
      dto: { type, item },
      idx,
      width,
      height,
    }: TorpedoLayoutedItem<FacetTorpedoItem>,
    itemStyle: React.CSSProperties
  ) => {
    return (
      <ItemCard
        itemIndex={Number(idx)} // It's number always, see https://github.com/wix-a/pro-gallery-layouter/blob/2a5a217151de90ed0a3e2c7b544e6bb99c18d39a/src/layouter.js#L186
        key={`item-${type}-${getItemId(item)}`}
        type={type}
        item={item}
        width={width}
        height={height}
        style={itemStyle}
      />
    );
  };
}

export default BrowseTorpedo;
