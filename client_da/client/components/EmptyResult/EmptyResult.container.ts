import { connect, MapStateToProps } from 'react-redux';
import { Props } from './EmptyResult';
import { AppState } from '../../types/store';
import { getSearchTerm, getErrorName } from '../../selectors/facet';
import { getPage } from '../../selectors/page';
import { Pages } from '../../../constants';

export type StateProps = Pick<
  Props,
  'searchTerm' | 'isSearchPage' | 'errorName'
>;
export type OwnProps = Without<Props, keyof (StateProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  searchTerm: getSearchTerm(state),
  isSearchPage: getPage(state) === Pages.Search,
  errorName: getErrorName(state),
});

export default connect(mapStateToProps);
