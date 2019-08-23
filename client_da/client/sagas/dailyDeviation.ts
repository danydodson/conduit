import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loadDailyDeviationsSuccess,
  loadDeviations,
} from '../actions/dailyDeviation';
import logger from '../helpers/logger';
import { ApiGetEndpoint } from '../../constants';
import { apiGet } from '../helpers/xhr';
import {
  DaBrowseDailyDeviationResponse,
  DaBrowseDailyDeviationParams,
} from '../../types/api';

export function fetchDailyDeviations(date: Date) {
  const params: DaBrowseDailyDeviationParams = {
    date: date.toISOString(),
    expand: 'deviation.daily_devs',
  };
  return apiGet<DaBrowseDailyDeviationResponse>(
    ApiGetEndpoint.DailyDeviations,
    params
  );
}

export function* handleLoadDeviations(action) {
  const { date } = action.payload;

  logger.log('fetching deviations for date', date.toISOString());

  const response: AsyncReturnType<typeof fetchDailyDeviations> = yield call(
    fetchDailyDeviations,
    date
  );

  if (!response) {
    // TODO: handle error
    return;
  }

  yield put(loadDailyDeviationsSuccess({ deviations: response }));
}

export default function* dailyDeviationRootSaga(): SagaIterator {
  yield takeLatest(loadDeviations, handleLoadDeviations);
}
