import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './EmptyResult.scss';

export interface Props {
  searchTerm?: string;
  isSearchPage?: boolean;
  errorName?: string;
}

export const EmptyResult: React.FC<Props> = ({
  isSearchPage,
  searchTerm,
  errorName,
}) => {
  const { t } = useTranslation();
  return (
    <div className={s['empty-state-root']}>
      <div className={s['empty-state-label']}>
        {isSearchPage
          ? t('searchPage.emptyState.title', {
              searchTerm,
            })
          : t('facetPage.emptyState.title')}
      </div>
      {errorName && (
        <div className={s['empty-state-error']}>
          {t(`searchPage.emptyState.error.${errorName}`)}
        </div>
      )}
      <div className={s['empty-state-suggestion']}>
        {isSearchPage
          ? t('searchPage.emptyState.suggestion')
          : t('facetPage.emptyState.suggestion')}
      </div>
    </div>
  );
};
EmptyResult.displayName = 'EmptyResult';

export default EmptyResult;
