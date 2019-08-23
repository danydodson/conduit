import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { MobileContext } from '@wix/da-shared-react/pkg/Context';
import {
  BiLoggerContextProvider,
  BiEventType,
  BiLink,
} from '@wix/da-shared-react/pkg/biLogger';
import shortenNumber from '@wix/da-shared-react/pkg/utils/shortenNumber';
import Button from '@wix/da-shared-react/pkg/Button';
import StripSlider from './StripSlider';
import { Strip as StripType } from '../../../types/api';
import Flag from '@wix/da-shared-react/pkg/redux/flags/Flag';
import MeasuredDeviationsMosaic from '@wix/da-shared-react/pkg/MeasuredDeviationsMosaic';
import { useFlag } from '@wix/da-shared-react/pkg/redux/flags/hooks/useFlag';

import s from './Strips.scss';

const SEE_ALL_BI_EVENT_DATA = {
  evid: BiEventType.SEE_ALL_CLICK,
};

export interface Props {
  strip: StripType;
  isSearchPage?: boolean;
}

export const Strip: React.FC<Props> = ({ strip, isSearchPage }) => {
  const { t } = useTranslation();
  const showRedesignedMobileBrowse = useFlag('redesigned_mobile_browse');
  const isMobile = useContext(MobileContext);

  if (
    !strip.deviations &&
    !strip.collections &&
    !strip.groups &&
    !strip.users
  ) {
    return null;
  }
  return (
    <BiLoggerContextProvider
      value={{
        sectionname: strip.title,
        _rankOffset: 0,
      }}
      key={strip.title}
    >
      <div
        className={classnames(
          s['strip-top-row'],
          showRedesignedMobileBrowse && s['strip-top-rowv2'],
          isSearchPage && s['strip-search-result']
        )}
      >
        <div
          className={classnames(
            s['strip-title-and-results'],
            showRedesignedMobileBrowse && s['strip-title-and-resultsv2']
          )}
        >
          <h2
            className={classnames(
              s['strip-title'],
              showRedesignedMobileBrowse && s['strip-titlev2']
            )}
          >
            {!isSearchPage && (
              <span
                className={classnames(
                  s['strip-title-prefix'],
                  showRedesignedMobileBrowse && s['strip-title-prefixv2']
                )}
              >
                {t('curated.strip.prefix')}{' '}
              </span>
            )}
            <BiLink
              href={strip.url}
              biData={SEE_ALL_BI_EVENT_DATA}
              className={classnames(
                showRedesignedMobileBrowse && s['strip-title-link']
              )}
            >
              {strip.title}
            </BiLink>
            <span className={s['strip-title-stripe']} />
          </h2>
          {strip.estTotal && (
            <div className={s['strip-results-count']}>
              {t('facetPage.strip.estTotal', {
                count: strip.estTotal,
                formattedCount: shortenNumber(strip.estTotal),
              })}
            </div>
          )}
        </div>
        <Button
          view="b33"
          href={strip.url}
          className={classnames(
            s['strip-all-link'],
            showRedesignedMobileBrowse && s['strip-all-linkv2']
          )}
          biData={SEE_ALL_BI_EVENT_DATA}
        >
          <span>{t('facetPage.strip.all')}</span>
        </Button>
      </div>
      <div>
        {isMobile ? (
          <Flag
            condition="redesigned_mobile_browse"
            render={() =>
              strip.deviations && (
                <MeasuredDeviationsMosaic deviations={strip.deviations} />
              )
            }
            fallbackRender={() => (
              <StripSlider isSearchPage={isSearchPage} strip={strip} />
            )}
          />
        ) : (
          <StripSlider isSearchPage={isSearchPage} strip={strip} />
        )}
      </div>
    </BiLoggerContextProvider>
  );
};
Strip.displayName = 'Strip';

export default Strip;
