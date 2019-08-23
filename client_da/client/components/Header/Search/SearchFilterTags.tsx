import React from 'react';
import classnames from 'classnames';
import CloseBold from '@wix/da-shared-react/pkg/Icons/CloseBold';
import { useChildrenFolding } from '@wix/da-shared-react/pkg/utils/hooks/useChildrenFolding';
import { BiLink, BiEventType } from '@wix/da-shared-react/pkg/biLogger';
import { Url } from '@wix/da-url';

import s from './SearchFilterTags.scss';

export type Tag = {
  tag: string;
  url: string;
  selected: boolean;
};

export interface Props {
  tags: Tag[];
  className?: string;
}

export interface State {
  overflowItems: { [k: string]: boolean };
  tagWidths: { [k: string]: number };
}

const MAX_LINES = 1;
const TAG_SPACING = parseInt(s['tag-spacing'], 10);

const SearchFilterTags = ({ tags, className }) => {
  const { sizedItems, containerRef } = useChildrenFolding(tags, {
    maxLines: MAX_LINES,
    itemSpacing: TAG_SPACING,
    getItemKey: (tag: Tag) => tag.tag,
  });
  return (
    <div className={classnames(s['root'], className)} ref={containerRef}>
      {sizedItems.map(({ item, isOverflow }) => (
        <BiLink
          key={item.tag}
          href={item.url}
          data-tag={item.tag}
          className={classnames(
            s['tag'],
            item.selected && s['tag-selected'],
            !isOverflow && s['visible']
          )}
          biData={{
            evid: BiEventType.SEARCH_TAG_CLICK,
            tag_text: item.tag,
            is_selected: item.selected ? 0 : 1,
            link_url: `${Url.browseHomeLink()}${item.url}`,
          }}
        >
          {item.tag}
          {item.selected && (
            <div className={s['cross']}>
              <CloseBold />
            </div>
          )}
        </BiLink>
      ))}
    </div>
  );
};
SearchFilterTags.displayName = 'SearchFilterTags';

export default SearchFilterTags;
