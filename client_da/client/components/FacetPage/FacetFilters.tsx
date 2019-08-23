import React from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import StandardDropdown from '@wix/da-shared-react/pkg/Dropdown/Preset/StandardDropdown';
import IconButton from '@wix/da-shared-react/pkg/Button/IconButton';
import FilterIcon from '@wix/da-shared-react/pkg/Icons/Filter';
import { IconSize } from '@wix/da-shared-react/pkg/Icons/IconWrap';

import { BiEventType, BiLink } from '@wix/da-shared-react/pkg/biLogger';
import { Props as FacetPageProps } from './FacetPage';
import { ArrowDownThin } from '@wix/da-shared-react/pkg/Icons/ArrowDown';
import s from './FacetPage.scss';

export type Props = Pick<
  FacetPageProps,
  'facetOptions' | 'facets' | 'order' | 'useUpdateUI'
>;

export interface State {
  areFiltersShown: boolean;
}

export class FacetFilters extends React.PureComponent<Props, State> {
  readonly state: State = {
    areFiltersShown: true,
  };

  render() {
    const { facets, facetOptions, useUpdateUI } = this.props;
    const { areFiltersShown } = this.state;
    if (facetOptions.length === 0) {
      return null;
    }

    return (
      <div className={s['facet-dropdown-wrapper']}>
        <div className={s['facet-filter-dropdowns']}>
          {areFiltersShown &&
            facetOptions.map(facetOption => {
              const scrollable = facetOption.facetItems.length > 10;
              const selectedValue = this.getSelectedValue(facets, facetOption);
              return (
                <StandardDropdown
                  key={facetOption.queryTermName}
                  className={classnames(
                    s['dropdown'],
                    s['facet-dropdown'],
                    s['facet-dropdown-sticky']
                  )}
                  menuClassName={classnames(
                    scrollable && s['facet-dropdown-menu-scrollable']
                  )}
                  toggleClassName={classnames(
                    s['facet-dropdown-toggle'],
                    useUpdateUI && s['use-update-ui'],
                    selectedValue && s['active-facet']
                  )}
                  openClassName={s['facet-dropdown-opend']}
                  menuScrollable={scrollable}
                  placeholder={facetOption.title}
                  selectedValue={
                    selectedValue || get(facetOption, 'facetItems[0].url')
                  }
                  arrowDown={className => (
                    <ArrowDownThin
                      className={className}
                      size={IconSize.SMALL}
                    />
                  )}
                  items={facetOption.facetItems.map(facetItem => ({
                    link: facetItem.url,
                    label: facetItem.title,
                    componentClass: BiLink,
                    componentProps: {
                      biData: {
                        evid: BiEventType.FACET_SELECT,
                        facetname: facetOption.queryTermName,
                        facetitem: facetItem.queryValue,
                      },
                    },
                  }))}
                />
              );
            })}
        </div>

        <IconButton
          onClick={this.handleToggleFilters}
          className={classnames(
            s['facet-filters-button-sticky'],
            useUpdateUI &&
              !areFiltersShown &&
              s['facet-filters-button-sticky-closed'],
            useUpdateUI && s['use-update-ui-stiky']
          )}
          biData={{
            evid: BiEventType.FACET_CONTROL_TOGGLE,
            facet_toggle: this.state.areFiltersShown ? 0 : 1,
          }}
        >
          <FilterIcon />
        </IconButton>
      </div>
    );
  }

  getSelectedValue(facets, facetOption) {
    const matchedValue = facetOption.facetItems.find(
      ({ queryValue }) => queryValue === facets[facetOption.queryTermName]
    );
    return matchedValue ? matchedValue.url : undefined;
  }

  handleToggleFilters = () => {
    this.setState({
      areFiltersShown: !this.state.areFiltersShown,
    });
  };
}

export default FacetFilters;
