import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { selectors, withOffset } from '@wix/da-shared-react/pkg/Stream/';
import { AppState } from '../../types/store';
import {
  FacetStreamProps,
  FacetStreamChildrenProps,
  FacetStreamItems,
} from './types';

type StateProps = Pick<
  FacetStreamChildrenProps,
  'items' | 'errorMsg' | 'hasMore' | 'isFetching'
>;
type DispatchProps = Pick<FacetStreamChildrenProps, 'fetchMore'>;

const mapStateToProps: MapStateToProps<
  StateProps,
  FacetStreamProps,
  AppState
> = (state, { streamId }) => {
  return {
    items: selectors.getItems(state, streamId) as FacetStreamItems,
    errorMsg: selectors.getErrorMsg(state, streamId),
    hasMore: selectors.hasMore(state, streamId),
    isFetching: selectors.isFetching(state, streamId),
  };
};

const mapDispatchToProps: MapDispatchToProps<
  DispatchProps,
  FacetStreamProps
> = (dispatch, ownProps) => {
  return {
    fetchMore() {
      dispatch(withOffset.actions.fetch(ownProps.streamId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
