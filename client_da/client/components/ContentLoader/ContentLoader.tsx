import React from 'react';
import EmptyResult from '../EmptyResult';
import LoadingIndicator from '@wix/da-shared-react/pkg/LoadingIndicator';

export interface Props {
  isLoading?: boolean;
  isEmpty?: boolean;
}

export const ContentLoader: React.FC<Props> = ({
  isLoading,
  isEmpty,
  children,
}) => {
  if (isLoading) {
    return <LoadingIndicator view="llama" />;
  }

  if (isEmpty) {
    return <EmptyResult />;
  }

  return <>{children}</>;
};
ContentLoader.displayName = 'ContentLoader';

export default ContentLoader;
