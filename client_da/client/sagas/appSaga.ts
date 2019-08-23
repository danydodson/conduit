import { all, takeLatest, select, put } from 'redux-saga/effects';
import { appLoaded } from '../actions/app';
import { AppState } from '../types/store';
import { SagaIterator } from 'redux-saga';
import { SEARCH_FIELD_ID } from '../components/Header/constants';
import { actions as siteHeaderActions } from '@wix/da-shared-react/pkg/SiteHeader';
import { ModalType } from '@wix/da-shared-react/pkg/Modals/redux/types';
import { actions as modalActions } from '@wix/da-shared-react/pkg/Modals';
import history from '@wix/da-shared-react/pkg/redux/routing/history';

export function* focusSearchFieldSaga() {
  const element = document.getElementById(SEARCH_FIELD_ID);
  if (element) {
    (element as HTMLInputElement).value = '';
    element.focus();
  }
}

export function* appLoadedSaga() {
  const modalType = yield select((state: AppState) => state.modalToShowOnLoad);
  if (!modalType) {
    return;
  }
  const types = {
    status: ModalType.STATUS_UPDATE,
    journal: ModalType.JOURNAL,
    literature: ModalType.LITERATURE,
    poll: ModalType.POLL_EDIT,
  };
  if (!types[modalType]) {
    return;
  }

  history.replace('/');
  yield put(modalActions.pushModal(types[modalType], { wrapInPopup: false }));
}

export default function* appSagaRoot(): SagaIterator {
  yield all([
    takeLatest(
      siteHeaderActions.siteHeaderSearchButtonClicked,
      focusSearchFieldSaga
    ),
    takeLatest(appLoaded, appLoadedSaga),
  ]);
}
