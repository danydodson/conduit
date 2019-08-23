import React from 'react';
import classnames from 'classnames';
import { ChangeRoutePayload } from '../../actions/app';
import { Strip as StripType } from '../../../types/api';
import MoreDeviationsBySearch from './MoreDeviationsBySearch';
import { useFlag } from '@wix/da-shared-react/pkg/redux/flags/hooks/useFlag';

import Strip from './Strip';
import s from './Strips.scss';

export interface Props {
  strips?: StripType[];
  topTags?: any;
  mainContentUrl?: string;
  isSearchPage?: boolean;
  originalSearchTerm?: string;
  changeRoute: (params: ChangeRoutePayload) => void;
}

export const Strips: React.FC<Props> = ({
  changeRoute,
  isSearchPage,
  originalSearchTerm,
  strips,
  topTags,
  mainContentUrl,
}) => {
  const searchTerm = `'${originalSearchTerm}'`;
  const showRedesignedMobileBrowse = useFlag('redesigned_mobile_browse');

  if (strips) {
    strips = strips.filter(
      strip =>
        strip.deviations || strip.collections || strip.groups || strip.users
    );
  }

  if (!strips || strips.length === 0) {
    return null;
  }

  return (
    <div
      className={classnames(
        s['strip-content'],
        showRedesignedMobileBrowse && s['strip-contentv2'],
        isSearchPage && s['search-root']
      )}
    >
      <div>
        {strips.map(strip => (
          <Strip key={strip.title} strip={strip} isSearchPage={isSearchPage} />
        ))}
      </div>
      {isSearchPage ? (
        <MoreDeviationsBySearch
          searchTerm={searchTerm}
          mainContentUrl={mainContentUrl}
        />
      ) : (
        <div
          className={classnames(
            s['strip-more-deviations'],
            showRedesignedMobileBrowse && s['strip-more-deviationsv2']
          )}
        />
      )}
    </div>
  );
};
Strips.displayName = 'Strips';

export default Strips;
