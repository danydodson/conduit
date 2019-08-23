import { getFacetedPageType } from './server/routes/pages/helpers';
import { Pages } from './constants';
import logger from './client/helpers/logger';

/** Create a id string for a stream based on a page and pageType */
export function getFacetStreamIdByPageAndRawPageType(
  page: Pages,
  pageType?: string
) {
  const facetedPageType = getFacetedPageType(pageType, page);
  logger.log('streamId', page, pageType, facetedPageType);
  return [facetedPageType, 'stream'].join(':');
}

/** Remove the trailing slash from the end of a url path */
export function stripSlashes(url: string) {
  // we only really split on the first ? since they're also valid in query params
  const [path, ...query] = url.split('?');
  const p = path.endsWith('/') ? path.slice(0, -1) : path;
  const q = query.length ? `?${query.join('?')}` : '';
  return `${p}${q}`;
}
