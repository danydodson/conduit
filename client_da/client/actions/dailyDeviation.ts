import { createAction } from 'redux-actions';
import { PapiDeviation } from '@wix/da-types-papi';

export interface InitDailyDeviationsPayload {
  date: string;
  deviations: PapiDeviation[];
}

export const initDailyDeviations = createAction<InitDailyDeviationsPayload>(
  'BROWSE.DAILY_DEVIATIONS.INIT'
);

export interface LoadDeviationsPayload {
  date: Date;
}

export const loadDeviations = createAction<LoadDeviationsPayload>(
  'BROWSE.DAILY_DEVIATIONS.LOAD_DEVIATIONS'
);

export interface LoadDailyDeviationsSuccessPayload {
  deviations: PapiDeviation[];
}

export const loadDailyDeviationsSuccess = createAction<
  LoadDailyDeviationsSuccessPayload
>('BROWSE.DAILY_DEVIATIONS.LOAD_DEVIATIONS_SUCCESS');
