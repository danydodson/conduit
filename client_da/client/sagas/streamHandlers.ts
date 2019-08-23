import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { selectors, withOffset } from '@wix/da-shared-react/pkg/Stream';
import { FetchAction } from '@wix/da-shared-react/pkg/Stream/base/types';
import { ApiGetEndpoint } from '../../constants';
import {
  DaBrowseFacetedRequest,
  DaBrowseFacetedResponse,
} from '../../types/api';
import { apiGet } from '../helpers/xhr';
import { getNormalizedFacetedRequestParams } from '../../server/routes/pages/helpers';
import { getFacetStreamState, getItemsPerFetch } from '../selectors/stream';
import { initFacetData } from '../actions/facet';
import { AppState } from '../types/store';
import { getPage } from '../selectors/page';
import { getFacetStreamIdByPageAndRawPageType } from '../../utils';
import { biFetchMoreItems } from '../actions/bi';
import { getTagStreamState } from '../selectors/tags';

const { STREAM__WITH_OFFSET__FETCH } = withOffset.actions;

function* onFetchWithOffset(action: FetchAction) {
  const { streamId } = action;

  const streamParams = yield select(selectors.getStreamParams, streamId);
  if (!streamParams || streamParams.type !== 'browsePage') {
    return;
  }

  yield put(biFetchMoreItems(streamId));

  // the request params of the tags api is different than the more general facet api
  // but the responses are the same, so we split the request into this function
  // and requestFacetWithNewOffset and have both return a DaBrowseFacetedResponse
  const currentPage = yield select(getPage);
  const result =
    currentPage === 'tag'
      ? yield call(requestTagsWithNewOffset, streamId)
      : yield call(requestFacetWithNewOffset, streamId);

  if (result) {
    const {
      hasMore = false,
      nextOffset,
      deviations,
      users,
      groups,
      collections,
    } = result;
    yield put(
      withOffset.actions.fetchSuccess({
        streamId,
        items: deviations || users || groups || collections || [],
        hasMore,
        nextOffset: nextOffset!,
      })
    );
    return;
  }

  yield put(
    withOffset.actions.fetchFailure({
      streamId,
      errorMsg: "Can't load deviations",
    })
  );
}

/** Make an api request for the next group of tagged items based on the offset of the previous request */
function* requestTagsWithNewOffset(streamId: string) {
  const streamState = yield select(getTagStreamState, streamId);
  const {
    offset,
    limit,
    requestParams,
  }: ReturnType<typeof getTagStreamState> = streamState;

  const newParams: DaBrowseFacetedRequest = getNormalizedFacetedRequestParams({
    ...requestParams,
    init: false,
    offset,
    limit,
  });

  const result: DaBrowseFacetedResponse = yield call(
    params => apiGet(ApiGetEndpoint.Tags, params),
    newParams
  );
  return result;
}

/** Make an api request for the next group of faceted items based on the offset of the previous request */
function* requestFacetWithNewOffset(streamId: string) {
  const {
    offset,
    limit,
    facetRequest: { offset: initialOffset, ...facetRequest },
  }: ReturnType<typeof getFacetStreamState> = yield select(
    getFacetStreamState,
    streamId
  );

  const requestParams: DaBrowseFacetedRequest = getNormalizedFacetedRequestParams(
    { init: false, offset, limit, ...facetRequest }
  );

  const result: DaBrowseFacetedRequest = yield call(
    params => apiGet(ApiGetEndpoint.Faceted, requestParams),
    requestParams
  );
  return result;
}

function* initFacetStream(action: ReturnType<typeof initFacetData>) {
  if (!action.payload) {
    return;
  }

  const {
    initData: { deviations, users, groups, collections, hasMore, nextOffset },
    requestParams: { page_type },
  } = action.payload;

  const { page, itemsPerFetch } = yield select<AppState>(state => ({
    page: getPage(state),
    itemsPerFetch: getItemsPerFetch(state),
  }));

  const streamId = getFacetStreamIdByPageAndRawPageType(page, page_type);
  const streamParams = { type: 'browsePage' };

  yield put(
    withOffset.actions.initialize({
      streamId,
      itemsPerFetch,
      items: deviations || users || groups || collections,
      hasMore,
      nextOffset: nextOffset!,
      streamParams,
    })
  );
}

export default function* browseStreamsRootSaga(): SagaIterator {
  yield takeEvery(STREAM__WITH_OFFSET__FETCH, onFetchWithOffset);
  yield takeEvery(initFacetData, initFacetStream);
}
