import { AppState } from '../types/store';
import { PapiRequestDaBrowseTags } from '@wix/da-types-papi';
import { Tag } from '../components/TagBar/TagBar';
import { withOffset, selectors } from '@wix/da-shared-react/pkg/Stream';

const UNDEFINED_TAG = 'unknown_tag';

export function getOrder(state: AppState): string {
  return getTagRequestParams(state).order || '';
}

export function getTagStreamState(state: AppState, streamId: string) {
  return {
    offset: withOffset.selectors.getNextOffset(state, streamId),
    limit: selectors.getItemsPerFetch(state, streamId),
    requestParams: getTagRequestParams(state),
  };
}

export function getTagRequestParams(state: AppState): PapiRequestDaBrowseTags {
  return (
    state.requestParams['tags'] || {
      tag: UNDEFINED_TAG,
    }
  );
}

export function getTag(state: AppState): string | undefined {
  return getTagRequestParams(state).tag || UNDEFINED_TAG;
}

export function getRelatedTags(state: AppState): Tag[] {
  return (state.facet.topTags as Tag[]) || [];
}

export function getInitialOffset(state: AppState) {
  return getTagRequestParams(state).offset;
}
