import { combineReducers, Reducer } from 'redux';
import page from './page';
import currentFacetPage from './currentFacetPage';
import facet from './facet';
import requestParams from './requestParams';
import pageData from './pageData';
import modalToShowOnLoad from './modal';
import { AppState } from '../types/store';
import { reducers as sharedReducers } from '@wix/da-shared-react/pkg/redux/shared';

const buildFakeReducer = defaultValue => (state = defaultValue, action) =>
  state;

// This type makes sure we do not forget to add a reducer for any slice
// of the store nor can we add extras for non-existing slices.
// Needed because monday (thursday) mornings exist.
type AppStateKeys = keyof AppState;
type AppStateReducersMapObject = { [k in AppStateKeys]: Reducer<any> };

const reducers: AppStateReducersMapObject = {
  ...sharedReducers,
  page,
  currentFacetPage,
  requestParams,
  facet,
  pageData,
  environment: buildFakeReducer({}),
  modalToShowOnLoad,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
