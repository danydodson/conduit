import { connect, MapStateToProps } from 'react-redux';
import { getIsMobile } from '@wix/da-shared-react/pkg/publicSession/selectors';
import { Props } from './DailyDeviationGrid';
import { AppState } from '../../types/store';
import { getFacetRequestQuery } from '../../selectors/facet';
import { getCurrentFacetStreamId } from '../../selectors/stream';

export type StateProps = Pick<Props, 'pageType' | 'isMobile' | 'streamId'>;
export type OwnProps = Without<Props, keyof (StateProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => {
  const { page_type: pageType } = getFacetRequestQuery(state);
  return {
    pageType,
    streamId: getCurrentFacetStreamId(state),
    isMobile: getIsMobile(state),
  };
};

export default connect(mapStateToProps);
