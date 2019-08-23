import { createAction } from 'redux-actions';
import {
  PapiDaBrowseFaceted,
  PapiRequestDaBrowseFaceted,
} from '@wix/da-types-papi';
import { Pages } from '../../constants';

export const initFacetData = createAction(
  'BROWSE.FACET.INIT_FACET_DATA',
  (
    page: Pages,
    initData: Without<PapiDaBrowseFaceted, 'session'>,
    requestParams: PapiRequestDaBrowseFaceted
  ) => ({ page, initData, requestParams })
);

export const offsetChanged = createAction(
  'BROWSE.FACET.OFFSET_CHANGED',
  (offset: number) => ({ offset })
);
