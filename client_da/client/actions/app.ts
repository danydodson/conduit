import { createAction } from 'redux-actions';
import { FacetPageType } from '../../types/api';

export const appLoaded = createAction('APP_LOADED');
export const startPageLoading = createAction(
  'BROWSE.SET_LOADING',
  (facetPageType: FacetPageType) => ({ facetPageType })
);

export interface ChangeRoutePayload {
  url: string;
}

export const changeRoute = createAction<ChangeRoutePayload>('CHANGE_ROUTE');
export const changeToFacetPage = createAction(
  'BROWSE.CHANGE_FACET_PAGE',
  (facetPageType: FacetPageType) => ({ facetPageType })
);
