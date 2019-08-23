import { createAction } from 'redux-actions';

export const biFetchMoreItems = createAction(
  'BI.FETCH_MORE_ITEMS',
  (streamId: string) => ({ streamId })
);
