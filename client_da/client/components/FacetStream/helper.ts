import get from 'lodash/get';
import { FacetItemTypes } from './types';
import {
  PapiDeviation,
  PapiGallection,
  PapiUser,
  PapiGroup,
} from '@wix/da-types-papi';
import { Strip, FacetItem } from '../../../types/api';

function isDeviation(item: FacetItem): item is PapiDeviation {
  return !!(item as PapiDeviation).deviationId;
}

function isGallection(item: FacetItem): item is PapiGallection {
  return !!(item as PapiGallection).folderId;
}

function isUser(item: FacetItem): item is PapiUser {
  return !!(item as PapiUser).userId;
}

function isGroup(item: FacetItem): item is PapiGroup {
  return get(item, 'user.type', '').includes('group');
}

export function getItemType(item: FacetItem) {
  if (!item) {
    return;
  }
  if (isDeviation(item)) {
    return FacetItemTypes.Deviation;
  }
  if (isUser(item)) {
    return FacetItemTypes.User;
  }
  if (isGallection(item)) {
    return FacetItemTypes.Gallection;
  }
  if (isGroup(item)) {
    return FacetItemTypes.Group;
  }
}

export function getItemId(item: FacetItem) {
  if (!item) {
    return;
  }
  if (isDeviation(item)) {
    return item.deviationId;
  }
  if (isUser(item)) {
    return item.userId;
  }
  if (isGallection(item)) {
    return item.folderId;
  }
  if (isGroup(item)) {
    return item.user.userId;
  }
}

export function getStripType(strip: Strip) {
  if (!strip) {
    return;
  }

  if (strip.deviations) {
    return FacetItemTypes.Deviation;
  }

  if (strip.users) {
    return FacetItemTypes.User;
  }

  if (strip.groups) {
    return FacetItemTypes.Group;
  }

  if (strip.collections) {
    return FacetItemTypes.Gallection;
  }
}

export function getStripItems(strip: Strip): FacetItem[] | undefined {
  switch (getStripType(strip)) {
    case FacetItemTypes.Deviation:
      return strip.deviations;
    case FacetItemTypes.Gallection:
      return strip.collections;
    case FacetItemTypes.Group:
      return strip.groups;
    case FacetItemTypes.User:
      return strip.users;
    default:
  }
}
