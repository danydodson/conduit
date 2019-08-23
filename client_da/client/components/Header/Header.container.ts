import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppState } from '../../types/store';
import { Props } from './types';
import {
  getFacet,
  getFacetPageMenu,
  getFacetPageType,
  getSearchTerm,
} from '../../selectors/facet';
import { changeToFacetPage } from '../../actions/app';
import { getPage } from '../../selectors/page';
import { Pages } from '../../../constants';

export type StateProps = Pick<
  Props,
  | 'items'
  | 'activeMenuItem'
  | 'estTotalTotal'
  | 'pageType'
  | 'searchTerm'
  | 'isSearchPage'
>;
export type DispatchProps = Pick<Props, 'changeToFacetPage'>;

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => {
  const { filterTags, selectedTags, estTotalTotal } = getFacet(state);

  const pageType = getFacetPageType(state);
  return {
    activeMenuItem: pageType || 'all',
    estTotalTotal,
    filterTags,
    isSearchPage: getPage(state) === Pages.Search,
    items: getFacetPageMenu(state),
    pageType,
    searchTerm: getSearchTerm(state) || '',
    selectedTags,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  changeToFacetPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
