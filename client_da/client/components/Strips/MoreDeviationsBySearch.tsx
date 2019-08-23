import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BiEventType } from '@wix/da-shared-react/pkg/biLogger/constants';
import Button from '@wix/da-shared-react/pkg/Button';
import s from './Strips.scss';

export interface Props {
  searchTerm: string;
  mainContentUrl?: string;
}

export const MoreDeviationsBySearch: React.FC<Props> = ({
  searchTerm,
  mainContentUrl,
}) => {
  const { t } = useTranslation();
  return (
    <div className={s['strip-more-deviations-by-search']}>
      {/* prettier-ignore */}
      <Trans i18nKey="facetPage.strip.moreDeviationsBySearch" parent="span">
        More{' '}
        <span className={s['strip-more-search-term']}>
          {{ searchTerm }}
        </span>{' '}
        Deviations
      </Trans>
      {mainContentUrl && (
        <Button
          view="b33"
          href={mainContentUrl}
          className={s['deviations-all']}
          biData={{
            evid: BiEventType.SEE_ALL_CLICK,
          }}
        >
          {t('facetPage.strip.all')}
        </Button>
      )}
    </div>
  );
};
MoreDeviationsBySearch.displayName = 'MoreDeviationsBySearch';

export default MoreDeviationsBySearch;
