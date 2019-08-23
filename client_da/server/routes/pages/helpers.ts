import reduce from 'lodash/reduce';
import { Pages, OFFSET_TRACKING_PAGE_SIZE } from '../../../constants';
import { PapiRequestDaBrowseFaceted, PapiDaBrowseFaceted, } from '@wix/da-types-papi';
import { DaRequest } from '../../types/da';
import logger from '../../../client/helpers/logger';
import { AnyPapiDaBrowseRequest, FacetPageType } from '../../../types/api';

export function normalizedRequestParam(acc, value, key) {
  const isValueUndefined = typeof value === 'undefined' || value === '';
  if (isValueUndefined) {
    return acc;
  }

  return { ...acc, [key]: value };
}

/*
 * Normalize request params before sending them to server:
 * - filter out keys with undefined values.
 * - don't send facets with value "all" - server can't understand them
 * - fixes camelCase shizzles
 */
export function getNormalizedFacetedRequestParams(
  requestParams
): PapiRequestDaBrowseFaceted {
  return reduce(
    requestParams,
    (acc, value, key) => {
      if (key === 'pageType') {
        return { ...acc, page_type: value };
      }
      const isFacetValueMissing = key.startsWith('facet_') && value === 'all';
      if (isFacetValueMissing) {
        return acc;
      }

      return normalizedRequestParam(acc, value, key);
    },
    {}
  ) as PapiRequestDaBrowseFaceted;
}

export const DEFAULT_SEARCH_PAGE_TYPE = 'search_home';
export const DEFAULT_BROWSE_PAGE_TYPE = 'browse_home';
export const DEFAULT_DD_PAGE_TYPE = 'dailydeviations';

/**
 * There is always one...
 * Sometimes we dont have 1-1 mapping between page_type in PAPI
 * and the url. So this just maps those for us.
 */
export function fixInconsistentPageTypes(pageType: string) {
  if (pageType === 'status-updates') {
    return 'statuses';
  }
  return pageType as FacetPageType;
}

/**
 * Get pageType by the following rules:
 * 1. if neither page nor pageType provided - assuming we are on "browse_home"
 * 2. if we are on "search" page but pageType is not provided or the value is "all" -
 * assuming we are on "search_home" page
 * 3. Return original pagePage otherwise.
 */
export function getFacetedPageType(
  pageType: string | undefined,
  page: Pages
): FacetPageType {
  switch (page) {
    case Pages.Search:
      if (!pageType || pageType === 'all') {
        return DEFAULT_SEARCH_PAGE_TYPE;
      }

      break;
    case Pages.DailyDeviation:
      return DEFAULT_DD_PAGE_TYPE;
    default:
      // Pages.Faceted
      if (!pageType) {
        return DEFAULT_BROWSE_PAGE_TYPE;
      }
      break;
  }

  return fixInconsistentPageTypes(pageType!);
}

export function getInitialOffset(page?: number, offset = 0) {
  return page ? Number(page) * OFFSET_TRACKING_PAGE_SIZE : Number(offset);
}

export const DEFAULT_TIMEOUT = 15000; // 15 sec
export async function doFacetedRequest(
  req: DaRequest,
  requestParams: AnyPapiDaBrowseRequest,
  endpoint = 'dabrowse/faceted'
) {
  logger.log('Request params', requestParams);
  const client = req.getPapi();

  client.requestOptions.timeout = DEFAULT_TIMEOUT;
  const result = await client.get(endpoint, {
    qs: requestParams,
  });
  return result.body as PapiDaBrowseFaceted;
}
