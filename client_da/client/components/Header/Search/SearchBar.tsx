import React from 'react';
import classnames from 'classnames';
import { withTranslation, WithTranslation } from 'react-i18next';
import queryString from 'query-string';
import shortenNumber from '@wix/da-shared-react/pkg/utils/shortenNumber';
import Input from '@wix/da-shared-react/pkg/Input';
import Button from '@wix/da-shared-react/pkg/Button';
import Flex from '@wix/da-shared-react/pkg/Flex';
import { SEARCH_FIELD_ID } from '../constants';
import { FacetPageType } from '../../../../types/api';
import SearchFilterTags from './SearchFilterTags';

import searchInputSkin from './searchInputSkin.scss';
import s from './SearchBar.scss';

export interface Props {
  searchTerm: string;
  estTotalTotal?: number;
  filterTags?: any[];
  pageType?: FacetPageType;
  selectedTags?: any[];
}

export type State = {
  showButton: boolean;
  search?: string;
};

class SearchBar extends React.Component<Props & WithTranslation, State> {
  readonly state: State = {
    showButton: false,
  };

  render() {
    const { t, searchTerm, filterTags } = this.props;

    return (
      <div className={s['search-wrap']}>
        <div className={s['search-wrap-inner']}>
          <form
            action="/search"
            onSubmit={this.handleSubmit}
            className={s['search-form']}
          >
            <Input
              id={SEARCH_FIELD_ID}
              name="q"
              autoComplete="off"
              className={s['search-field-input-layout']}
              skin={searchInputSkin}
              label={t!('browseHeader.search.input.label')}
              defaultValue={searchTerm}
              onChange={this.handleChange}
              onFocus={this.handleChange}
              onBlur={this.handleBlur}
            />
            <Button
              className={classnames(
                s['search-submit-button'],
                this.state &&
                  this.state.showButton &&
                  s['search-submit-button-visible']
              )}
              view={'b16-undisciplined-designers'}
              type="submit"
            >
              {t('siteHeader.search.button')}
            </Button>
          </form>
          <Flex alignItems="center" className={s['search-result']}>
            <span className={s['result-item']}>{this.renderTotalLabel()}</span>
            {filterTags && (
              <>
                <span className={s['separator']}>|</span>
                <span className={s['result-item']}>Tags:</span>
                <SearchFilterTags
                  tags={this.getFilterTags()}
                  className={s['search-tags']}
                />
              </>
            )}
          </Flex>
        </div>
      </div>
    );
  }

  renderTotalLabel() {
    const { t, searchTerm, estTotalTotal, pageType } = this.props;
    if (!estTotalTotal || estTotalTotal === 0) {
      return t('searchPage.noResults', { searchTerm });
    }

    const formattedCount = shortenNumber(estTotalTotal);
    const count = estTotalTotal;
    if (pageType === 'artists') {
      return t('searchPage.searchTerm.artists', {
        count,
        formattedCount,
        searchTerm,
      });
    }

    return t('searchPage.searchTerm', {
      formattedCount,
      count,
    });
  }

  handleChange = value => {
    this.setState({
      showButton: value !== '',
      search: typeof value === 'string' ? value : undefined,
    });
  };

  handleBlur = () => {
    // Need timeout because blur happens when you try and click the search :)
    setTimeout(() => {
      this.setState({ showButton: false });
    }, 300);
  };

  handleSubmit = e => {
    const parsedQueryString = queryString.parse(window.location.search);
    if (this.state && this.state.search) {
      const query = { ...parsedQueryString, q: this.state.search };
      window.location.search = queryString.stringify(query);
    }
    e.preventDefault();
    return false;
  };

  getFilterTags() {
    const { filterTags, selectedTags } = this.props;
    if (!filterTags) {
      return;
    }
    if (!selectedTags) {
      return filterTags;
    }
    const filterAndSelectedTags: any = [...selectedTags, ...filterTags];
    const tags: any = [];
    for (const filter of filterAndSelectedTags) {
      const selected = selectedTags.find(sel => sel.tag === filter.tag);
      tags.push({
        ...filter,
        selected: selected !== undefined,
      });
    }

    return tags.filter(
      (tag, idx, self) => idx === self.findIndex(t => t.tag === tag.tag)
    );
  }
}

export default withTranslation()(SearchBar);
