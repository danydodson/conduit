import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { flagEnabled } from '@wix/da-shared-react/pkg/redux/flags';
import { Url } from '@wix/da-url';
import { Props } from './TagPage';
import { AppState } from '../../types/store';
import { getEffectiveOrder, getOrderOptions } from '../../selectors/facet';
import { getOrder, getTag, getRelatedTags } from '../../selectors/tags';

export type StateProps = Pick<Props, 'tag' | 'relatedTags'>;
export type DispatchProps = Pick<Props, never>;
export type OwnProps = Without<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  AppState
> = state => {
  const order = flagEnabled(state, 'browse_show_effective_order')
    ? getEffectiveOrder(state)
    : getOrder(state);
  return {
    orderOptions: getOrderOptions(state),
    order,
    tag: getTag(state),
    relatedTags: getRelatedTags(state).map(tag => {
      return {
        name: tag.tag,
        url: Url.tagsPageLink(tag.tag),
      };
    }),
  };
};
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
