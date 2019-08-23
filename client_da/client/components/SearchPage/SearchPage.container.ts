import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { Props } from './SearchPage';
import { AppState } from '../../types/store';
import { getShouldShowFooter } from '../../selectors/app';

export type StateProps = Pick<Props, 'shouldShowFooter'>;
export type DispatchProps = Pick<Props, never>;
export type OwnProps = Without<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => ({
  shouldShowFooter: getShouldShowFooter(state),
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
