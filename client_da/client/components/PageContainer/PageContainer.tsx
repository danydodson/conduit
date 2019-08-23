import React from 'react';
import SiteFooter from '@wix/da-shared-react/pkg/SiteFooter';
import { BiDataHook } from '@wix/da-shared-react/pkg/biLogger';
import Header from '../Header';
import s from './PageContainer.scss';

export interface Props {
  withTabHeader?: boolean;
  withFooter?: boolean;
  className?: string;
}

export const PageContainer: React.FC<Props> = ({
  children,
  withTabHeader = true,
  withFooter = false,
  className,
}) => {
  return (
    <>
      {withTabHeader && <Header />}
      <div className={s['page']} data-hook={BiDataHook.BROWSE_ALL_CONTENT}>
        <div className={className}>{children}</div>
        {withFooter && <SiteFooter />}
      </div>
    </>
  );
};
PageContainer.displayName = 'PageContainer';

export default PageContainer;
