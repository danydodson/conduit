import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { Props } from './Strips';
import { AppState } from '../../types/store';
import { getFacet, getSearchTerm } from '../../selectors/facet';
import { changeRoute } from '../../actions/app';
import { getPage } from '../../selectors/page';
import { Pages } from '../../../constants';

export type StateProps = Pick<
  Props,
  | 'strips'
  | 'topTags'
  | 'mainContentUrl'
  | 'originalSearchTerm'
  | 'isSearchPage'
>;
export type DispatchProps = Pick<Props, 'changeRoute'>;
export type OwnProps = Without<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => {
  const { strips, topTags, mainContentUrl } = getFacet(state);
  return {
    strips,
    topTags,
    mainContentUrl,
    originalSearchTerm: getSearchTerm(state),
    isSearchPage: getPage(state) === Pages.Search,
  };
};
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  changeRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
