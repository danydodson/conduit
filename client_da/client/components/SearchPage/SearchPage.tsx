import React from 'react';
import FacetPage from '../FacetPage';
import PageContainer from '../PageContainer';

export interface Props {
  shouldShowFooter: boolean;
}

export const SearchPage: React.FC<Props> = ({ shouldShowFooter }) => {
  return (
    <PageContainer withFooter={shouldShowFooter}>
      <FacetPage />
    </PageContainer>
  );
};
SearchPage.displayName = 'SearchPage';

export default SearchPage;
