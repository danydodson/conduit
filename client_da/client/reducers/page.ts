import { handleActions } from 'redux-actions';
import { Pages } from '../../constants';
import { initFacetData } from '../actions/facet';

const reducer = handleActions<Pages, any>(
  {
    [initFacetData.toString()]: (
      state,
      { payload }: ReturnType<typeof initFacetData>
    ) => (payload ? payload.page : state),
  },
  Pages.Faceted
);

export default reducer;
