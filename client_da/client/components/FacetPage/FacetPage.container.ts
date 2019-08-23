import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { getIsMobile } from '@wix/da-shared-react/pkg/publicSession/selectors';
import { flagEnabled } from '@wix/da-shared-react/pkg/redux/flags';
import { AppState } from '../../types/store';
import { Props } from './FacetPage';
import {
  getFacet,
  getSearchTerm,
  getFacetRequestQuery,
  getActiveFacets,
  getEffectiveOrder,
} from '../../selectors/facet';
import { changeRoute } from '../../actions/app';
import { getIsPageLoading } from '../../selectors/page';
import { getCurrentFacetStreamId } from '../../selectors/stream';

export type StateProps = Pick<
  Props,
  | 'estTotal'
  | 'facetOptions'
  | 'facets'
  | 'offset'
  | 'order'
  | 'orderOptions'
  | 'pageType'
  | 'searchTerm'
  | 'streamId'
  | 'mainContentUrl'
  | 'isMobile'
  | 'useUpdateUI'
  | 'isLoading'
>;
type DispatchProps = Pick<Props, 'changeRoute'>;
type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;
const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => {
  const {
    estTotal,
    facetOptions = [],
    orderOptions,
    mainContentUrl,
  } = getFacet(state);
  const { order: userRequestedOrder, page_type, offset } = getFacetRequestQuery(
    state
  );
  const order = flagEnabled(state, 'browse_show_effective_order')
    ? getEffectiveOrder(state)
    : userRequestedOrder;

  return {
    isLoading: getIsPageLoading(state),
    estTotal,
    facetOptions: facetOptions.map(facetOption => ({
      title: facetOption.title,
      queryTermName: facetOption.queryTermName!,
      facetItems: facetOption.facetItems!,
    })),
    facets: getActiveFacets(state),
    offset,
    order,
    orderOptions,
    pageType: page_type,
    searchTerm: getSearchTerm(state),
    streamId: getCurrentFacetStreamId(state),
    mainContentUrl,
    isMobile: getIsMobile(state),
    useUpdateUI: flagEnabled(state, 'c45_update_ui_component'),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  changeRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
