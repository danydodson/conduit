import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import {
  getIsMobile,
  getPagingMode,
} from '@wix/da-shared-react/pkg/publicSession/selectors';
import { flagEnabled } from '@wix/da-shared-react/pkg/redux/flags/selectors';
import { Props } from './BrowseThumbLayout';
import { AppState } from '../../types/store';
import { getFacetRequestQuery, getFacet } from '../../selectors/facet';
import { offsetChanged } from '../../actions/facet';
import { getCurrentFacetStreamId } from '../../selectors/stream';
import { getRelatedSeoNavigation } from '../../selectors/app';
import { getIsDuperbrowseActive } from '@wix/da-shared-react/pkg/Duperbrowse/redux/selectors';

export type StateProps = Pick<
  Props,
  | 'pageType'
  | 'isMobile'
  | 'streamId'
  | 'pagination'
  | 'pagingMode'
  | 'paginatedBrowse'
  | 'isDuperbrowseActive'
  | 'strips'
  | 'showOverlayStats'
>;
export type DispatchProps = Pick<Props, 'onOffsetReached'>;
export type OwnProps = Without<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => {
  const { page_type: pageType } = getFacetRequestQuery(state);
  const pagination = getRelatedSeoNavigation(state);
  const { strips } = getFacet(state);
  return {
    pageType,
    streamId: getCurrentFacetStreamId(state),
    isMobile: getIsMobile(state),
    pagingMode: getPagingMode(state),
    pagination: {
      nextUrl: pagination.next,
      prevUrl: pagination.prev,
    },
    paginatedBrowse: flagEnabled(state, 'paginated_browse'),
    isDuperbrowseActive: getIsDuperbrowseActive(state as any),
    strips,
    showOverlayStats: !(
      getIsMobile(state) && flagEnabled(state, 'redesigned_mobile_browse')
    ),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  onOffsetReached: offsetChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
