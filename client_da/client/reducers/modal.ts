import { handleActions } from 'redux-actions';
import { AppState } from '../types/store';
import { showModalOnLoad } from '../actions/modal';

const reducer = handleActions<AppState['modalToShowOnLoad'], any>(
  {
    [`${showModalOnLoad}`](state, action) {
      return action.payload;
    },
  },
  ''
);

export default reducer;
