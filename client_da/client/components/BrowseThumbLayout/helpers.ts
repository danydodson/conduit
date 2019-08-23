import {
  PapiDeviation,
  PapiUser,
  PapiGallection,
  PapiGroup,
} from '@wix/da-types-papi';
import { FacetItem } from '../../../types/api';
import { FacetItemTypes } from '../FacetStream/types';
import { getItemType } from '../FacetStream';
import { FacetTorpedoItem } from '../FacetPage/FacetPage';
import { makeDeviationId } from '@wix/da-shared-react/pkg/redux/normalizr/schemas/deviation';
import MediaService from '@wix/da-shared-react/pkg/utils/DeviationMediaService';

export const facetItemToTorpedoItem = (
  item: FacetItem,
  isMobile?: boolean
): FacetTorpedoItem | undefined => {
  const type = getItemType(item);
  switch (type) {
    case FacetItemTypes.Deviation:
      const deviation = item as PapiDeviation;
      const id = `deviation-${deviation.deviationId}`;
      if (isMobile) {
        return {
          id,
          width: 3430,
          height: 2290,
          type,
          item,
        };
      }
      const { width = 1000, height = 1000 } = MediaService.getLargestFullview(
        deviation
      );
      return {
        id,
        width,
        height,
        type,
        item,
        duperbrowseItemId: makeDeviationId(deviation),
      };
    case FacetItemTypes.User:
      return {
        id: `artist-${(item as PapiUser).userId}`,
        width: 4380,
        height: 2880,
        type,
        item,
      };
    case FacetItemTypes.Gallection:
      return {
        id: `gallection-${(item as PapiGallection).folderId}`,
        width: isMobile ? 3430 : 4380,
        height: isMobile ? 2290 : 4580,
        type,
        item,
      };
    case FacetItemTypes.Group:
      return {
        id: `group-${(item as PapiGroup).user.userId}`,
        width: isMobile ? 1000 : 8870,
        height: isMobile ? 1000 : 3430,
        type,
        item,
      };
    default:
      return;
  }
};

export const facetItemsToTorpedoItems = (
  items: FacetItem[],
  isMobile?: boolean
): FacetTorpedoItem[] => {
  const facetTorpedoItems: FacetTorpedoItem[] = [];
  items.forEach(item => {
    const torpedoItem = facetItemToTorpedoItem(item, isMobile);
    if (torpedoItem) {
      facetTorpedoItems.push(torpedoItem);
    }
  });
  return facetTorpedoItems;
};
