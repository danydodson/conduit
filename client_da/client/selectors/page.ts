import { AppState } from '../types/store';
import { FacetPageType } from '../../types/api';
import { Pages } from '../../constants';

export function getPage(state: AppState) {
  return state.page;
}

export function getIsPageLoading(state: AppState) {
  return state.pageData.isLoading;
}

export function getPageForNextPageType(
  state: AppState,
  pageType: FacetPageType
) {
  const currentPage = getPage(state);

  if (currentPage === Pages.DailyDeviation && pageType !== 'dailydeviations') {
    return Pages.Faceted;
  }

  switch (pageType) {
    case 'dailydeviations':
      return Pages.DailyDeviation;
    case 'tag' as any: // TODO
      return Pages.Tag;
    default:
      return currentPage;
  }
}
