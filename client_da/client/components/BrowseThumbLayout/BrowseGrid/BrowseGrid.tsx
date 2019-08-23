import React from 'react';
import { MeasuredCookieType } from '@wix/da-shared-react/pkg/Measured';
import ItemCard from '../../ItemCard';
import Grid, { GridElement } from '@wix/da-shared-react/pkg/Grid';
import { FacetPageType, FacetItem } from '../../../../types/api';
import { getItemType, getItemId } from '../../FacetStream';
import { getBreakpointsForPageType } from './breakpoints';
import Strips from '../../Strips';
import { PapiDaBrowseFaceted } from '@wix/da-types-papi';

export interface Props {
  items: FacetItem[];
  pageType: FacetPageType;
  isMobile?: boolean;
  strips?: PapiDaBrowseFaceted['strips'];
}

export class BrowseGrid extends React.Component<Props> {
  render() {
    const { strips, isMobile } = this.props;
    let stripProps = {};
    if (strips && strips.length > 0) {
      stripProps = {
        contentStrip: <Strips />,
        contentStripIndex: 5,
        contentStripHeight: isMobile ? 900 : 500,
      };
    }

    return (
      <Grid
        {...stripProps}
        elementCount={this.props.items.length}
        cookieType={MeasuredCookieType.BROWSE}
        renderElement={this.renderGridItem}
        getElementId={this.getGridItemId}
        enableScrollOptim={true}
        breakpoints={getBreakpointsForPageType(
          this.props.pageType,
          this.props.isMobile
        )}
        measureWindow={true}
      />
    );
  }

  renderGridItem = (element: GridElement) => {
    const { index, width, height, style } = element;
    const { items } = this.props;
    const item = items[index];
    const type = getItemType(item);

    return (
      item &&
      type && (
        <ItemCard
          itemIndex={index}
          key={this.getGridItemId(index)}
          type={type}
          item={item}
          width={width}
          height={height}
          style={style}
        />
      )
    );
  };

  getGridItemId = (index: number) => {
    const { items } = this.props;
    const item = items[index];
    const type = getItemType(item);
    return `item-${type}-${getItemId(item)}`;
  };
}

export default BrowseGrid;
