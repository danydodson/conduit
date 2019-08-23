import React from 'react';
import FacetPage from '../FacetPage';
import PageContainer from '../PageContainer';

export interface Props {}

export const BrowsePage: React.FC<Props> = props => {
  return (
    <PageContainer>
      <FacetPage />
    </PageContainer>
  );
};
BrowsePage.displayName = 'BrowsePage';

export default BrowsePage;
