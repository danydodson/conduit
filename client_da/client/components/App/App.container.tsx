import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import {
  getTheme,
  getIsMobile,
  getSeoCanonical,
  getSeoTitle,
  getSeoDescription,
} from '@wix/da-shared-react/pkg/publicSession/selectors';
import { appLoaded, changeRoute } from '../../actions/app';
import { AppState } from '../../types/store';
import { getPage } from '../../selectors/page';
import { getBiView } from '../../selectors/biLogger';
import { getFacetPageType } from '../../selectors/facet';
import { getRelatedSeoNavigation } from '../../selectors/app';
import { Props } from './App';

type StateProps = Pick<
  Props,
  | 'pageTitle'
  | 'pageDescription'
  | 'seoCanonical'
  | 'isMobile'
  | 'theme'
  | 'page'
  | 'environment'
  | 'pageType'
  | 'biView'
  | 'seoNavigation'
  | 'page'
>;
type DispatchProps = Pick<Props, 'appLoaded' | 'changeRoute'>;
type OwnProps = Without<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  pageTitle: getSeoTitle(state),
  pageDescription: getSeoDescription(state),
  seoCanonical: getSeoCanonical(state),
  isMobile: getIsMobile(state),
  page: getPage(state),
  biView: getBiView(state),
  pageType: getFacetPageType(state),
  theme: getTheme(state),
  environment: state.environment.type,
  seoNavigation: getRelatedSeoNavigation(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  appLoaded,
  changeRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
