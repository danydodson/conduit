import { createAction } from 'redux-actions';

export const showModalOnLoad = createAction<string>(
  'BROWSE.SHOW_MODAL_ON_LOAD'
);
