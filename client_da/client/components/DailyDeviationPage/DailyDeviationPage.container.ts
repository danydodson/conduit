import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { Props } from './DailyDeviationPage';
import { AppState } from '../../types/store';
import { getFacetRequestQuery } from '../../selectors/facet';
import { changeRoute } from '../../actions/app';
import { getCurrentFacetStreamId } from '../../selectors/stream';

export type StateProps = Pick<Props, 'date' | 'streamId'>;
export type DispatchProps = Pick<Props, 'changeRoute'>;
export type OwnProps = Without<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => {
  const { q } = getFacetRequestQuery(state);
  return {
    date: q,
    streamId: getCurrentFacetStreamId(state),
  };
};
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  changeRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
