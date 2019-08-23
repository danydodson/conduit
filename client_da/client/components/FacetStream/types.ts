import {
  PapiDeviation,
  PapiUser,
  PapiGallection,
  PapiGroup,
} from '@wix/da-types-papi';

export interface FacetStreamProps {
  streamId: string;
}

export type FacetStreamItems =
  | PapiDeviation[]
  | PapiUser[]
  | PapiGallection[]
  | PapiGroup[];

export interface FacetStreamChildrenProps {
  items: FacetStreamItems;
  hasMore: boolean;
  isFetching: boolean;
  errorMsg?: string;
  fetchMore: () => void;
}

export enum FacetItemTypes {
  Deviation = 'deviation',
  User = 'user',
  Group = 'group',
  Gallection = 'gallection',
}
