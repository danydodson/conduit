import { handleActions } from 'redux-actions';
import { AppState } from '../types/store';
import { initFacetData } from '../actions/facet';
import { startPageLoading } from '../actions/app';

const reducer = handleActions<AppState['pageData'], any>(
  {
    [initFacetData.toString()]: state => ({ ...state, isLoading: false }),
    [startPageLoading.toString()]: state => ({ ...state, isLoading: true }),
  },
  { isLoading: true }
);

export default reducer;
