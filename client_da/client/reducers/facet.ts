import { handleActions } from 'redux-actions';
import { initFacetData } from '../actions/facet';
import { AppState } from '../types/store';
import { stripSlashes } from '../../utils';

const transformFacetItem = item => ({ ...item, url: stripSlashes(item.url) });

const transformFacetOption = option => {
  if (option.facetItems) {
    return { ...option, facetItems: option.facetItems.map(transformFacetItem) };
  }
  return option;
};

const transformOrderOption = option => ({
  ...option,
  url: stripSlashes(option.url),
});

const reducer = handleActions<AppState['facet'], any>(
  {
    [`${initFacetData}`](state, { payload }: ReturnType<typeof initFacetData>) {
      if (!payload) {
        return state;
      }

      const {
        deviations,
        estTotal,
        estTotalTotal,
        facetOptions,
        hasMore,
        nextOffset,
        effectiveOrder,
        orderOptions,
        filterTags,
        selectedTags,
        strips,
        title,
        topTags,
        mainContentUrl,
        errorCode,
      } = payload.initData;

      return {
        deviations,
        estTotal,
        estTotalTotal,
        facetOptions: facetOptions
          ? facetOptions.map(transformFacetOption)
          : undefined,
        filterTags,
        hasMore,
        nextOffset,
        effectiveOrder,
        orderOptions: orderOptions
          ? orderOptions.map(transformOrderOption)
          : undefined,
        selectedTags,
        strips,
        title,
        topTags,
        mainContentUrl,
        errorCode,
      };
    },
  },
  {}
);

export default reducer;
