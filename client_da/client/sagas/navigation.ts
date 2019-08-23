import {
  all,
  takeLatest,
  select,
  throttle,
  put,
  call,
} from 'redux-saga/effects';
import queryString from 'query-string';
import { Location, createLocation } from 'history';
import {
  changeRoute,
  changeToFacetPage,
  startPageLoading,
} from '../actions/app';
import { offsetChanged, initFacetData } from '../actions/facet';
import {
  OFFSET_TRACKING_PAGE_SIZE,
  ApiGetEndpoint,
  Pages,
} from '../../constants';
import {
  getInitialOffset,
  getFacetPageMenu,
  getFacetRequestQuery,
  getFacetRequestQueryForPage,
} from '../selectors/facet';
import history from '@wix/da-shared-react/pkg/redux/routing/history';
import { historyChanged } from '@wix/da-shared-react/pkg/redux/routing/actions';
import {
  PapiDaBrowseFaceted,
  PapiRequestDaBrowseFaceted,
} from '@wix/da-types-papi';
import { apiGet } from '../helpers/xhr';
// import { actions as streamActions } from '@wix/da-shared-react/pkg/Stream';
import { getNormalizedFacetedRequestParams } from '../../server/routes/pages/helpers';
import { getItemsPerFetch } from '../selectors/stream';
import { AppState } from '../types/store';
import { FacetPageType } from '../../types/api';
import { getPageForNextPageType } from '../selectors/page';
import { getIsDuperbrowseActive } from '@wix/da-shared-react/pkg/Duperbrowse/redux/selectors';

function fetchFacetPageFromApi(requestParams: PapiRequestDaBrowseFaceted) {
  return apiGet<PapiDaBrowseFaceted>(ApiGetEndpoint.Faceted, requestParams);
}

function* changeRouteSaga(action: ReturnType<typeof changeRoute>) {
  // TODO: replace with client-side routing
  window.location.href = action.payload!.url;
}

function* changeToFacetPageSaga(action: ReturnType<typeof changeToFacetPage>) {
  if (!action.payload) {
    return;
  }

  const { facetPageType } = action.payload;

  const menu: ReturnType<typeof getFacetPageMenu> = yield select(
    getFacetPageMenu
  );
  const pageInfo =
    menu && menu.find(menuItem => menuItem.pageType === facetPageType);

  if (!pageInfo) {
    return;
  }

  // add current facet page type to history state for popstate handling
  const query: ReturnType<typeof getFacetRequestQuery> = yield select(
    getFacetRequestQuery
  );
  history.replace({
    state: {
      facetPageType: query.page_type,
    },
  });
  // then push the next
  history.push(pageInfo.url, { facetPageType });
  yield call(loadFacetPage, facetPageType, createLocation(pageInfo.url));
}

function* historyChangedSaga({ payload }: ReturnType<typeof historyChanged>) {
  if (!payload) {
    return;
  }

  const { location, action } = payload;

  // only need to handle pop state
  if (action !== 'POP') {
    return;
  }

  // if we have the right data in state, we can load via xhr
  if (location.state && location.state.facetPageType) {
    yield call(loadFacetPage, location.state.facetPageType, location);
    return;
  }

  // otherwise this was not a known change, so better just reload from server
  window.location.reload();
}

function* loadFacetPage(facetPageType: FacetPageType, location: Location) {
  // fetch request params
  const {
    limit,
    requestParams,
    page,
  }: {
    limit: number;
    requestParams: ReturnType<typeof getFacetRequestQueryForPage>;
    oldStreamId: string;
    page: Pages;
  } = yield select<AppState>(state => ({
    limit: getItemsPerFetch(state, facetPageType),
    requestParams: getFacetRequestQueryForPage(state, facetPageType),
    page: getPageForNextPageType(state, facetPageType),
  }));

  // let's get some params from the location
  const { page: pageOffset, ...restQuery } = queryString.parse(location.search);

  // now facets, they are painful
  const pathBits = location.pathname.split('/').filter(x => !!x);

  // we don't care if it's search
  if (pathBits[0] === 'search') {
    pathBits.shift();
  }

  pathBits.shift(); // remove page type
  const [facet_type, facet_content, facet_category] = pathBits;

  yield put(startPageLoading(facetPageType));

  // now fetch page data
  const params: PapiRequestDaBrowseFaceted = getNormalizedFacetedRequestParams({
    facet_type,
    facet_content,
    facet_category,
    ...restQuery,
    ...requestParams,
    init: true,
    offset: 0,
    limit,
    page_type: facetPageType,
  });

  // DDs are a special snowflake, of course
  if (facetPageType === 'dailydeviations' && !params.q) {
    params.q = new Date().toISOString().substr(0, 10);
  }

  const result: AsyncReturnType<typeof fetchFacetPageFromApi> = yield call(
    fetchFacetPageFromApi,
    params
  );

  yield all([
    // if there was an error, we will just show the "no result" page
    put(initFacetData(page, result || {}, params)),

    // This is currently racey - we need to cleanup the way page/facet type works so that
    // they are passed all the way through and we dont use the selectors etc
    // finally clean up old stream
    // put(streamActions.deleteStream(oldStreamId)),
  ]);

  // scroll back up...
  window.scrollTo(0, 0);
}

function* updateOffsets(action: ReturnType<typeof offsetChanged>) {
  const isDuperbrowseActive = yield select(getIsDuperbrowseActive);

  // we've no business updating offsets while in duperbrowse
  if (isDuperbrowseActive) {
    return;
  }

  const initialOffset: number = yield select(getInitialOffset) || 0;
  const { offset } = action.payload || { offset: 0 };
  const newPage = Math.floor(
    (offset + initialOffset) / OFFSET_TRACKING_PAGE_SIZE
  );

  const { page: currentPage, ...restQuery } = queryString.parse(
    window.location.search
  );

  if (newPage === parseInt(currentPage as string, 10)) {
    return;
  }

  const newQuery = queryString.stringify(
    newPage === 0 ? restQuery : { ...restQuery, page: newPage }
  );

  history.replace({
    search: newQuery && `?${newQuery}`,
  });
  // if we have offset tracking, disable scroll restoration for this page
  window.history.scrollRestoration = 'manual';
}

export default function* appSagaRoot() {
  yield all([
    takeLatest(changeRoute, changeRouteSaga),
    takeLatest(changeToFacetPage, changeToFacetPageSaga),
    takeLatest(historyChanged, historyChangedSaga),
    throttle(500, offsetChanged, updateOffsets),
  ]);
}
