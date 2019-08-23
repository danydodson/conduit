import { handleActions } from 'redux-actions';
import { FacetPageType } from '../../types/api';
import { startPageLoading } from '../actions/app';
import { initFacetData } from '../actions/facet';

type AllPageTypes = FacetPageType | 'tags';
const reducer = handleActions<AllPageTypes, any>(
  {
    [startPageLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof startPageLoading>
    ) => (payload ? payload.facetPageType : state),
    [initFacetData.toString()]: (
      state,
      { payload }: ReturnType<typeof initFacetData>
    ) => {
      if (payload.page === 'tag') {
        return 'tags';
      }
      return payload.requestParams.page_type;
    },
  },
  'browse_home'
);

export default reducer;
