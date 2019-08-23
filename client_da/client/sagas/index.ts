import { all, fork } from 'redux-saga/effects';
import appSaga from './appSaga';
import biLogger from './biLogger';
import dailyDeviationSaga from './dailyDeviation';
import streamHandlerSaga from './streamHandlers';
import navigation from './navigation';
import { sagas } from '@wix/da-shared-react/pkg/redux/shared';

export default function* daDeviationRootSaga() {
  yield all([
    // project sagas
    fork(appSaga),
    fork(dailyDeviationSaga),
    fork(streamHandlerSaga),
    fork(biLogger),
    fork(navigation),

    // shared sagas
    ...sagas.map(fork),
  ]);
}
