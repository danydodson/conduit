import { FacetPageType } from '../../../../types/api';
import {
  adjustBreakpointHeight,
  DEFAULT_BREAKPOINTS,
} from '@wix/da-shared-react/pkg/Grid/breakpoints';
export const getBreakpointsForPageType = (
  pageType: FacetPageType,
  isMobile?: boolean
) => {
  if (isMobile) {
    switch (pageType) {
      case 'commissions':
      case 'collections':
      case 'polls':
        return [
          {
            maxWidth: 9999,
            elementWidth: 343,
            elementHeight: 404,
          },
        ];
      case 'statuses':
      case 'journals':
        return [
          {
            maxWidth: 9999,
            elementWidth: 343,
            elementHeight: 318,
          },
        ];
      case 'artists':
      case 'groups':
      default:
        return [
          {
            maxWidth: 9999,
            elementWidth: 343,
            elementHeight: 239,
          },
        ];
    }
  }

  let heightAdjustment;
  switch (pageType) {
    case 'commissions':
      heightAdjustment = 82;
      break;
    case 'collections':
      heightAdjustment = 113;
      break;
    case 'artists':
    case 'groups':
    case 'statuses':
    case 'polls':
    case 'journals':
    default:
      heightAdjustment = 0;
  }
  // Use the DEFAULT_BREAKPOINTS but increase the height slightly to make room for the bottom panel
  return adjustBreakpointHeight(DEFAULT_BREAKPOINTS, heightAdjustment);
};
