import React from 'react';
import { useTranslation } from 'react-i18next';
import { PapiDeviation } from '@wix/da-types-papi';
import DeviationDuperbrowseContext from '@wix/da-shared-react/pkg/Duperbrowse/DeviationDuperbrowseContext';
import { FacetPageType, FacetItem } from '../../../../types/api';
import { FacetItemTypes } from '../../FacetStream/types';
import { getItemType } from '../../FacetStream/helper';

export interface Props {
  streamId: string;
  items: FacetItem[];
  pageType: FacetPageType;
}

const BrowseDuperContext: React.FC<Props> = ({
  items,
  streamId,
  pageType,
  children,
}) => {
  const { t } = useTranslation();
  // this comes with the assumption that either all items are deviations or none, which is the case for now at least
  const isDeviationStream = getItemType(items[0]) === FacetItemTypes.Deviation;

  if (!items.length || !isDeviationStream) {
    return <>{children}</>;
  }

  return (
    <DeviationDuperbrowseContext
      streamId={streamId}
      deviations={items as PapiDeviation[]}
      parent={{
        title: t([`browseHeader.page.${pageType}`, 'common.browse']),
      }}
    >
      {children}
    </DeviationDuperbrowseContext>
  );
};
BrowseDuperContext.displayName = 'BrowseDuperContext';

export default BrowseDuperContext;
