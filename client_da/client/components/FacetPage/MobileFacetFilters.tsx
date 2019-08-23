import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import classnames from 'classnames';
import IconButton from '@wix/da-shared-react/pkg/Button/IconButton';
import ManageWatchList from '@wix/da-shared-react/pkg/Icons/ManageWatchList';
import FilterIcon from '@wix/da-shared-react/pkg/Icons/Filter';
import Flag from '@wix/da-shared-react/pkg/redux/flags/Flag';
import Separator from '@wix/da-shared-react/pkg/Separator';
import { BiEventType, BiLink } from '@wix/da-shared-react/pkg/biLogger';
import { Props as FacetPageProps } from './FacetPage';
import MobileFacetDropdown from './MobileFacetDropdown';
import s from './MobileFacetFilters.scss';

function getAreFiltersShown(props) {
  return (
    Object.keys(props.facets)
      .map(facetKey => props.facets[facetKey])
      .filter(Boolean).length > 0
  );
}

export type Props = Pick<
  FacetPageProps,
  'facetOptions' | 'facets' | 'order' | 'orderOptions'
>;

export interface State {
  areFiltersShown: boolean;
}

// TODO clean this up, this was last hours hack...
export class MobileFacetFilters extends React.PureComponent<
  Props & WithTranslation,
  State
> {
  readonly state: State = {
    areFiltersShown: getAreFiltersShown(this.props),
  };

  render() {
    const { order, orderOptions, facetOptions, t } = this.props;
    const { areFiltersShown } = this.state;
    return (
      <>
        <div className={s['filter-bar']}>
          {orderOptions && orderOptions.length ? (
            <MobileFacetDropdown
              titleClassName={s['order-dropdown-title']}
              arrowClassName={s['order-dropdown-arrow']}
              title={this.getOrderTitle(orderOptions, order)}
              onSelect={ord => {
                const found = orderOptions.find(o => o.order === ord);
                if (found) {
                  window.location.assign(found.url);
                }
              }}
              items={orderOptions.map(option => ({
                value: option.order,
                label: option.title,
                selected: option.order === order,
                componentClass: BiLink,
                componentProps: {
                  biData: {
                    evid: BiEventType.SORT_TYPE_SELECT,
                    sort_selection: option.order,
                  },
                },
              }))}
            />
          ) : null}
          {facetOptions.length > 0 && (
            <IconButton
              onClick={this.handleToggleFilters}
              className={classnames(
                areFiltersShown && s['facet-filters-button-active']
              )}
            >
              <Flag
                condition="redesigned_mobile_browse"
                render={() => <FilterIcon />}
                fallbackRender={() => (
                  <>
                    <ManageWatchList />
                    <span className={s['filter-text']}>
                      {t('facetPage.filter')}
                    </span>
                  </>
                )}
              />
            </IconButton>
          )}
        </div>
        {areFiltersShown && facetOptions.length > 0 && (
          <>
            <Separator className={s['separator']} />
            {this.renderFacets()}
          </>
        )}
      </>
    );
  }

  renderFacets() {
    const { facets, facetOptions } = this.props;
    if (facetOptions.length === 0) {
      return null;
    }
    return (
      <div className={s['native-facet-dropdown-wrapper']}>
        <div className={s['native-facet-filter-dropdowns']}>
          {facetOptions.map(facetOption => (
            <MobileFacetDropdown
              titleClassName={s['facet-dropdown-title']}
              arrowClassName={s['facet-dropdown-arrow']}
              title={this.getSelectedFacetTitle(facets, facetOption)}
              key={facetOption.queryTermName}
              onSelect={f => {
                const found = facetOption.facetItems.find(
                  fac => fac.queryValue === f
                );
                if (found) {
                  window.location.assign(found.url);
                }
              }}
              items={facetOption.facetItems.map(facetItem => ({
                value: facetItem.queryValue,
                label: facetItem.title,
                selected:
                  this.getSelectedValue(facets, facetOption) === facetItem.url,
              }))}
            />
          ))}
        </div>
      </div>
    );
  }

  getSelectedValue(facets, facetOption) {
    const matchedValue = facetOption.facetItems.find(
      ({ queryValue }) => queryValue === facets[facetOption.queryTermName]
    );
    return matchedValue ? matchedValue.url : undefined;
  }

  getSelectedFacetTitle(facets, facetOption) {
    const matchedValue = facetOption.facetItems.find(
      ({ queryValue }) => queryValue === facets[facetOption.queryTermName]
    );
    return matchedValue ? matchedValue.title : facetOption.title;
  }

  handleToggleFilters = () => {
    this.setState({
      areFiltersShown: !this.state.areFiltersShown,
    });
  };

  getOrderTitle(orderOptions, order) {
    const found = orderOptions.find(o => o.order === order);
    return found ? found.title : '';
  }
}

export default withTranslation()(MobileFacetFilters);
