import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import classnames from 'classnames';
import Waypoint from 'react-waypoint';
import { PapiDaBrowseFaceted } from '@wix/da-types-papi';
import { getDeviationType } from '@wix/da-shared-react/pkg/DeviationViews/_helpers';
import LoadingIndicator from '@wix/da-shared-react/pkg/LoadingIndicator';
import OverlayContext from '@wix/da-shared-react/pkg/DeviationViews/Thumb/Standard/Overlay/OverlayContext';
import {
  default as OnScrollBottom,
  DISTANCE_UNIT,
} from '@wix/da-shared-react/pkg/OnScrollBottom';
import { getItemType } from '../FacetStream';
import {
  FacetItemTypes,
  FacetStreamChildrenProps,
  FacetStreamProps,
} from '../FacetStream/types';
import { FacetPageType } from '../../../types/api';
import EmptyResult from '../EmptyResult';
import { DeviationTypes } from '@wix/da-shared-react/pkg/types/deviation';
import BrowseGrid from './BrowseGrid';
import BrowseTorpedo from './BrowseTorpedo';
import BrowseDuperContext from './BrowseDuperContext';

import s from './BrowseThumbLayout.scss';

const DISTANCE_FROM_BOTTOM_TO_FETCH_MORE = 1000;

export interface Props extends FacetStreamProps {
  isMobile: boolean;
  pageType: FacetPageType;
  onOffsetReached: (offset: number) => void;
  pagingMode?: 'scroll' | 'page';
  pagination: {
    nextUrl?: string;
    prevUrl?: string;
  };
  paginatedBrowse?: boolean;
  isDuperbrowseActive: boolean;
  strips?: PapiDaBrowseFaceted['strips'];
  showOverlayStats?: boolean;
}

export class BrowseThumbLayout extends React.Component<
  Props & FacetStreamChildrenProps & WithTranslation
> {
  render() {
    const {
      hasMore,
      isFetching,
      isDuperbrowseActive,
      isMobile,
      items,
      onOffsetReached,
      pageType,
      paginatedBrowse,
      pagingMode,
      streamId,
      t,
      strips,
      showOverlayStats,
    } = this.props;

    if (!items || items.length === 0) {
      return <EmptyResult />;
    }

    const firstItem = items[0];
    const streamType = getItemType(firstItem);
    const useTorpedoLayout =
      !isMobile &&
      streamType === FacetItemTypes.Deviation &&
      getDeviationType(firstItem as any) === DeviationTypes.IMAGE;
    return (
      <OverlayContext.Provider
        value={{ showAuthorTooltip: true, showStats: showOverlayStats }}
      >
        <Waypoint onEnter={this.handleScrollToTop} />
        <BrowseDuperContext
          items={items}
          streamId={streamId}
          pageType={pageType}
        >
          {useTorpedoLayout && (
            <BrowseTorpedo
              strips={strips}
              items={items}
              isDuperbrowseActive={isDuperbrowseActive}
              isMobile={isMobile}
              onOffsetReached={onOffsetReached}
              streamId={streamId}
            />
          )}
          {!useTorpedoLayout && (
            <BrowseGrid
              strips={strips}
              items={items}
              pageType={pageType}
              isMobile={isMobile}
            />
          )}
        </BrowseDuperContext>
        {isFetching && <LoadingIndicator />}
        {!isFetching && !hasMore && (
          <div className={s['end-of-results']}>{t('facetPage.endResults')}</div>
        )}
        {paginatedBrowse && pagingMode === 'page' && this.renderPager()}
        {pagingMode === 'scroll' && (
          <OnScrollBottom
            checkOnMount
            onScrolledToBottom={this.handleScrollToBottom}
            distanceToBottom={DISTANCE_FROM_BOTTOM_TO_FETCH_MORE}
            distanceUnit={DISTANCE_UNIT.PX}
          />
        )}
      </OverlayContext.Provider>
    );
  }

  renderPager() {
    const { pagination, hasMore } = this.props;
    if (!hasMore) {
      return null;
    }
    return (
      <div className={s['paged']}>
        <a
          href={pagination.prevUrl}
          className={classnames(
            s['pager-control'],
            !pagination.prevUrl && s['pager-control-disabled']
          )}
        >
          Prev
        </a>
        <a
          href={pagination.nextUrl}
          className={classnames(
            s['pager-control'],
            !pagination.nextUrl && s['pager-control-disabled']
          )}
        >
          Next
        </a>
      </div>
    );
  }

  handleScrollToBottom = () => {
    const { isFetching, hasMore, fetchMore, isDuperbrowseActive } = this.props;

    if (isFetching || !hasMore || isDuperbrowseActive) {
      return;
    }

    fetchMore();
  };

  handleScrollToTop = () => {
    const { onOffsetReached, isDuperbrowseActive } = this.props;

    if (isDuperbrowseActive) {
      return;
    }

    onOffsetReached(0);
  };
}

export default withTranslation()(BrowseThumbLayout);
