import { handleActions } from 'redux-actions';
import { AppState } from '../types/store';
import { initFacetData } from '../actions/facet';

const reducer = handleActions<AppState['requestParams'], any>(
  {
    [`${initFacetData}`](state, { payload }: ReturnType<typeof initFacetData>) {
      if (!payload) {
        return state;
      }

      const {
        page_type,
        order = payload.initData.effectiveOrder,
        ...restParams
      } = payload.requestParams;

      const isTagPage = payload.page === 'tag';
      const key = isTagPage ? 'tags' : page_type;
      return {
        ...state,
        [key]: {
          page_type,
          order,
          ...restParams,
        },
      };
    },
  },
  {}
);

export default reducer;
