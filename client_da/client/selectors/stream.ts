import { AppState } from '../types/store';
import { withOffset, selectors } from '@wix/da-shared-react/pkg/Stream';
import { getFacetRequestQuery } from './facet';
import { getFacetStreamIdByPageAndRawPageType } from '../../utils';
import { getPage } from './page';
import { getIsMobile } from '@wix/da-shared-react/pkg/publicSession/selectors';
import { Pages } from '../../constants';
import { FacetPageType } from '../../types/api';

export function getCurrentFacetStreamId(state: AppState) {
  const page = getPage(state);
  const requestParams = getFacetRequestQuery(state);
  return getFacetStreamIdByPageAndRawPageType(page, requestParams.page_type);
}

export function getFacetStreamState(state: AppState, streamId: string) {
  return {
    offset: withOffset.selectors.getNextOffset(state, streamId),
    limit: selectors.getItemsPerFetch(state, streamId),
    facetRequest: getFacetRequestQuery(state),
  };
}

export function getItemsPerFetch(
  state: AppState,
  facetPageType?: FacetPageType
) {
  if (facetPageType) {
    if (facetPageType === 'dailydeviations') {
      return 3;
    }
    return getIsMobile(state) ? 10 : 24;
  }

  const page = getPage(state);
  if (page === Pages.DailyDeviation) {
    return 3;
  }
  return getIsMobile(state) ? 10 : 24;
}

export function getIsCurrentStreamEmpty(state: AppState) {
  const streamId = getCurrentFacetStreamId(state);
  const items = selectors.getItems(state, streamId);
  return !items || items.length === 0;
}
