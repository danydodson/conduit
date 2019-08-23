import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { PapiDeviation } from '@wix/da-types-papi';
import LoadingIndicator from '@wix/da-shared-react/pkg/LoadingIndicator';
import {
  formatDate,
  DATE_FORMATS,
} from '@wix/da-shared-react/pkg/Timestamp/functions';
import { MeasuredCookieType } from '@wix/da-shared-react/pkg/Measured/redux/types';
import DeviationDuperbrowseContext from '@wix/da-shared-react/pkg/Duperbrowse/DeviationDuperbrowseContext';
import TwoColumnLayout from '@wix/da-shared-react/pkg/Layout/TwoColumnLayout';
import {
  FacetStreamChildrenProps,
  FacetStreamProps,
} from '../FacetStream/types';
import { FacetPageType } from '../../../types/api';
import Button from '@wix/da-shared-react/pkg/Button';

import s from './DailyDeviationGrid.scss';

export interface Props extends FacetStreamProps {
  isMobile: boolean;
  pageType: FacetPageType;
}

export class DailyDeviationGrid extends React.Component<
  Props & FacetStreamChildrenProps & WithTranslation
> {
  render() {
    const { hasMore, isFetching, isMobile, items, t, streamId } = this.props;

    // Index the items by their DD day
    const days = {};
    for (const item of items) {
      const { dailyDeviation } = item as PapiDeviation;
      if (!dailyDeviation) {
        continue;
      }
      if (!days[dailyDeviation.time]) {
        days[dailyDeviation.time] = [];
      }
      days[dailyDeviation.time].push(item);
    }
    const wrapped = Object.keys(days).map((day, idx) => {
      return (
        <React.Fragment key={`day-${day}`}>
          {idx !== 0 && (
            <div className={s['dd-date']}>
              {formatDate(day, DATE_FORMATS.Date.Full)}
            </div>
          )}
          <div>
            <DeviationDuperbrowseContext
              streamId={streamId}
              deviations={days[day]}
              parent={{ title: t(`browseHeader.page.dailydeviations`) }}
            >
              <TwoColumnLayout
                cookieDim={'width'}
                cookieType={MeasuredCookieType.DAILY_DEVIATIONS}
                listenOnWindow={true}
                deviations={days[day]}
                spacing={isMobile ? 16 : 8}
              />
            </DeviationDuperbrowseContext>
          </div>
        </React.Fragment>
      );
    });

    return (
      <>
        {wrapped}
        {isFetching && <LoadingIndicator />}
        {hasMore && !isFetching && (
          <Button
            view={'b8'}
            className={s['show-more']}
            onClick={this.handleLoadMore}
          >
            {t('dailyDev.showMore')}
          </Button>
        )}
      </>
    );
  }

  handleLoadMore = () => {
    this.props.fetchMore && this.props.fetchMore();
  };
}
export default withTranslation()(DailyDeviationGrid);
