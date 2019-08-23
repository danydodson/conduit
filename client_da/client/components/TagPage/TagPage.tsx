import React, { useContext } from 'react';
import classnames from 'classnames';
import queryString from 'query-string';
import PageContainer from '../PageContainer';
import OrderDropdown from '../OrderDropdown';
import Tags from '@wix/da-shared-react/pkg/Tags';
import { Tag } from '@wix/da-shared-react/pkg/Tags/types';
import { OrderOption } from '../../../types/api';
import BrowseThumbLayout from '../BrowseThumbLayout';
import { MobileContext } from '@wix/da-shared-react/pkg/Context';
import MobileOrderDropdown from '../OrderDropdown/MobileOrderDropdown';
import s from './TagPage.scss';

export interface Props {
  tag?: string;
  relatedTags?: Tag[];
  orderOptions?: OrderOption[];
  order?: string;
}

export const TagPage: React.FC<Props> = ({
  tag = 'unknown tag',
  relatedTags = [],
  orderOptions = [],
  order,
}) => {
  const isMobile = useContext(MobileContext);
  const buildLinkFromOption = option => `/tag/${tag}?order=${option.order}`;
  const selectedOption =
    orderOptions.length > 0 && order
      ? orderOptions.find(option => option.order === order)
      : undefined;
  const hasRelatedTags = !!relatedTags.length;
  const rootClassNames = classnames(
    s['root'],
    !hasRelatedTags && s['no-related-tags']
  );
  return (
    <PageContainer withTabHeader={false}>
      <div className={rootClassNames}>
        <h1 className={s['title']}>
          Explore <span className={s['title-tag']}>{tag}</span>
        </h1>
        <header className={s['controls']}>
          {hasRelatedTags && (
            <Tags className={s['tag-bar']} tags={relatedTags} />
          )}
          {!isMobile && order && (
            <OrderDropdown
              className={s['order-dropdown']}
              menuClassName={s['order-dropdown-menu']}
              order={order}
              orderOptions={orderOptions}
              buildLinkFromOption={buildLinkFromOption}
            />
          )}
          {isMobile && order && orderOptions && selectedOption && (
            <MobileOrderDropdown
              order={order}
              title={selectedOption.title}
              orderOptions={orderOptions}
              onSelect={value =>
                (window.location.search = queryString.stringify({
                  ...queryString.parse(window.location.search),
                  order: value,
                }))
              }
            />
          )}
        </header>
        <BrowseThumbLayout />
      </div>
    </PageContainer>
  );
};
TagPage.displayName = 'TagPage';

export default TagPage;
