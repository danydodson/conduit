import queryString from 'query-string';
import { selectors } from '@wix/da-shared-react/pkg/Stream/';
import { AppState } from '../types/store';
import { getPage } from './page';
import { Pages, OFFSET_TRACKING_PAGE_SIZE } from '../../constants';
import { getFacet, getFacetRequestQuery } from './facet';
import { getCurrentFacetStreamId } from './stream';

export function getShouldShowFooter(state: AppState): boolean {
  const page = getPage(state);
  if (page === Pages.DailyDeviation) {
    return true;
  }

  if (page === Pages.Search) {
    // Show footer in case search page has no results
    const streamId = getCurrentFacetStreamId(state);
    const items = selectors.getItems(state, streamId);
    return !items || items.length === 0;
  }

  return false;
}

export function getRelatedSeoNavigation(state: AppState) {
  const { offset: initialOffset = 0 } = getFacetRequestQuery(state);
  const { hasMore } = getFacet(state);

  const page = Math.floor(initialOffset / OFFSET_TRACKING_PAGE_SIZE);

  const { url, query } = queryString.parseUrl(
    typeof window === 'undefined'
      ? state.environment.requestUrl
      : window.location.href
  );

  const setPage = pageParam => {
    const qs = queryString.stringify({
      ...query,
      page: pageParam || undefined,
    });
    if (!qs) {
      return url;
    }

    return `${url}?${qs}`;
  };

  return {
    next: hasMore ? setPage(page + 1) : undefined,
    prev: page > 0 ? setPage(page - 1) : undefined,
  };
}
