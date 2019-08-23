import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { Props } from './ContentLoader';
import { AppState } from '../../types/store';
import { getIsPageLoading } from '../../selectors/page';
import { getIsCurrentStreamEmpty } from '../../selectors/stream';

export type StateProps = Pick<Props, 'isEmpty' | 'isLoading'>;
export type DispatchProps = Pick<Props, never>;
export type OwnProps = Without<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  isEmpty: getIsCurrentStreamEmpty(state),
  isLoading: getIsPageLoading(state),
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
