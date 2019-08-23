import { AppState } from '../types/store';
import { FacetPageType, OrderOption } from '../../types/api';
import { getPage } from './page';
import { Pages } from '../../constants';
import { PapiRequestDaBrowseFaceted } from '@wix/da-types-papi';

export function getFacet(state: AppState): AppState['facet'] {
  return state.facet;
}

export function getEffectiveOrder(state: AppState): string {
  return getFacet(state).effectiveOrder || '';
}

export function getOrderOptions(state: AppState): OrderOption[] {
  return getFacet(state).orderOptions || [];
}

export function getFacetRequestQueryForPage(
  state: AppState,
  page: FacetPageType
): PapiRequestDaBrowseFaceted {
  return (
    state.requestParams[page] || {
      page_type: page,
    }
  );
}

export function getFacetRequestQuery(
  state: AppState
): PapiRequestDaBrowseFaceted {
  return getFacetRequestQueryForPage(state, state.currentFacetPage);
}

export function getActiveFacets(state: AppState) {
  const { facet_category, facet_type, facet_content } = getFacetRequestQuery(
    state
  );
  return {
    facet_category,
    facet_type,
    facet_content,
  };
}

export function getFacetPageType(state: AppState): FacetPageType | undefined {
  const page = getPage(state);
  const isPageWithFacets = [
    Pages.Faceted,
    Pages.Search,
    Pages.DailyDeviation,
  ].includes(page);
  if (!isPageWithFacets) {
    return undefined;
  }

  return getFacetRequestQuery(state).page_type;
}

export function getSearchTerm(state: AppState): string | undefined {
  return getFacetRequestQuery(state).q;
}

export function getFacetPageMenu(state: AppState) {
  return state.pageData.otherPageTypes;
}

export function getErrorName(state: AppState) {
  const errorCode = getFacet(state).errorCode;
  if (errorCode === undefined) {
    return 'none';
  }

  const errorNames = [
    'none',
    'request',
    'highOffset',
    'noResults',
    'pastEndOfResults',
    'allMature',
    'allStored',
    'allDeleted',
    'allAntisocial',
    'highLoad',
    'allBlocked',
  ];
  return errorNames[errorCode] || 'none';
}

export function getInitialOffset(state: AppState) {
  return getFacetRequestQuery(state).offset;
}
