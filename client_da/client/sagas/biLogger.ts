import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import { BIEventData, BiEventType } from '@wix/da-shared-react/pkg/biLogger';
import { logPageView } from '@wix/da-shared-react/pkg/biLogger/redux/actions';
import { logBiEvent } from '@wix/da-shared-react/pkg/biLogger/redux/saga';
import { appLoaded } from '../actions/app';
import { initFacetData } from '../actions/facet';
import { getFacetPageType } from '../selectors/facet';
import { getBiView } from '../selectors/biLogger';
import { selectors } from '@wix/da-shared-react/pkg/Stream';
import { exitDuperbrowseDone } from '@wix/da-shared-react/pkg/Duperbrowse/redux/actionCreators';
import { biFetchMoreItems } from '../actions/bi';

export function* pageViewHandler() {
  const eventComponent = yield select(getFacetPageType);
  const biView = yield select(getBiView);

  yield put(
    logPageView({
      component: eventComponent,
      view: biView,
    })
  );
}

export function* infiniteScrollHandler() {
  const eventComponent = yield select(getFacetPageType);
  const biView = yield select(getBiView);
  const offset = yield select(selectors.getTotalItemsCount);

  const event: BIEventData = {
    evid: BiEventType.SCROLL_TO_LOAD_MORE,
    component: eventComponent,
    view: biView,
    offset,
  };

  yield call(logBiEvent, event);
}

export default function* biLogger() {
  yield all([
    takeEvery([appLoaded, initFacetData, exitDuperbrowseDone], pageViewHandler),
    takeEvery(biFetchMoreItems, infiniteScrollHandler),
  ]);
}
