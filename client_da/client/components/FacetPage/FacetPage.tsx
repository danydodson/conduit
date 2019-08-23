import React from 'react';
import classnames from 'classnames';
import { WithTranslation, withTranslation } from 'react-i18next';
import shortenNumber from '@wix/da-shared-react/pkg/utils/shortenNumber';
import { FacetStreamChildrenProps, FacetStreamProps } from '../FacetStream';
import { FacetPageType, FacetItem } from '../../../types/api';
import FacetFilters from './FacetFilters';
import { ChangeRoutePayload } from '../../actions/app';
import { TorpedoItem } from '@wix/da-shared-react/pkg/Torpedo/types';
import { PapiDaBrowseFaceted } from '@wix/da-types-papi';
import { FacetItemTypes } from '../FacetStream/types';
import Button from '@wix/da-shared-react/pkg/Button';
import { IconSize } from '@wix/da-shared-react/pkg/Icons/IconWrap';
import { MobileFacetFilters } from './MobileFacetFilters';
import {
  BiLoggerContextProvider,
  BiEventType,
  BiLink,
  BiDataHook,
} from '@wix/da-shared-react/pkg/biLogger';
import Sticky from '@wix/da-shared-react/pkg/Sticky';

import BrowseThumbLayout from '../BrowseThumbLayout';
import ContentLoader from '../ContentLoader';
import { ArrowDownThin } from '@wix/da-shared-react/pkg/Icons/ArrowDown';
import OrderDropdown from '../OrderDropdown';

import s from './FacetPage.scss';

const SEE_ALL_BI_EVENT_DATA = {
  evid: BiEventType.SEE_ALL_CLICK,
};

export interface Props extends FacetStreamProps {
  estTotal?: number;
  isMobile: boolean;
  pageType: FacetPageType;
  offset?: number;
  orderOptions?: PapiDaBrowseFaceted['orderOptions'];
  order?: string;
  useUpdateUI?: boolean;
  facetOptions: {
    title: string;
    queryTermName: string;
    facetItems: {
      title: string;
      queryValue?: string;
      url: string;
    }[];
  }[];
  facets: {
    [k: string]: string | undefined;
  };
  searchTerm?: string;
  mainContentUrl?: string;
  isLoading: boolean;
  changeRoute: (params: ChangeRoutePayload) => void;
}

export interface FacetTorpedoItem extends TorpedoItem {
  item: FacetItem;
  type: FacetItemTypes;
}

class FacetPage extends React.Component<
  Props & FacetStreamChildrenProps & WithTranslation
> {
  render() {
    const { isLoading, offset = 0 } = this.props;

    return (
      <div className={classnames(s['root'], s['search-root'])}>
        <BiLoggerContextProvider
          value={{
            sectionname: 'general',
            _rankOffset: offset,
          }}
        >
          {!isLoading && this.renderStickyNavigation()}
          <ContentLoader>{this.renderItems()}</ContentLoader>
        </BiLoggerContextProvider>
      </div>
    );
  }

  renderStickyNavigation() {
    const {
      order,
      facets,
      isMobile,
      useUpdateUI,
      orderOptions,
      facetOptions,
    } = this.props;
    if (!facetOptions || !facetOptions.length) {
      return null;
    }

    return isMobile ? (
      <MobileFacetFilters {...this.props} />
    ) : (
      <Sticky
        marginTop={
          parseInt(s['site-header-height'], 10) -
          parseInt(s['filter-bar-padding-top'], 10)
        }
        zIndex={parseInt(s['z-index'], 10)}
      >
        {isStuck => (
          <div
            className={classnames(
              s['sticky-filter-bar'],
              isStuck && s['stuck']
            )}
            data-hook={BiDataHook.FILTER_NAV}
          >
            <OrderDropdown
              order={order}
              orderOptions={orderOptions}
              className={classnames(
                s['dropdown'],
                useUpdateUI && s['use-update-ui']
              )}
              arrowDown={className => (
                <ArrowDownThin className={className} size={IconSize.SMALL} />
              )}
            />
            <FacetFilters
              order={order}
              facetOptions={facetOptions}
              facets={facets}
              useUpdateUI={useUpdateUI}
            />
          </div>
        )}
      </Sticky>
    );
  }

  renderItems() {
    const { estTotal, pageType, t, mainContentUrl, changeRoute } = this.props;
    const isDeviationsTitleALink = Boolean(mainContentUrl);
    return (
      <div className={s[`page-type-${pageType}`]}>
        {pageType === 'search_home' && (
          <div className={s['deviations-header']}>
            <div className={s['deviations-title-container']}>
              <span className={s['deviations-title']}>
                {isDeviationsTitleALink ? (
                  <BiLink href={mainContentUrl} biData={SEE_ALL_BI_EVENT_DATA}>
                    {t('facetPage.deviationsTitle')}
                  </BiLink>
                ) : (
                  t('facetPage.deviationsTitle')
                )}
              </span>
              <span className={s['deviations-count']}>
                {t('facetPage.deviationsEstTotal', {
                  count: estTotal,
                  formattedCount: shortenNumber(estTotal),
                })}
              </span>
            </div>
            {mainContentUrl && (
              <Button
                view="b33"
                onClick={() => changeRoute({ url: mainContentUrl })}
                className={s['deviations-all']}
                biData={SEE_ALL_BI_EVENT_DATA}
              >
                {t('facetPage.strip.all')}
              </Button>
            )}
          </div>
        )}
        <BrowseThumbLayout />
      </div>
    );
  }
}

export default withTranslation()(FacetPage);
