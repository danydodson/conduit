import React, { useContext } from 'react';
import { MobileContext } from '@wix/da-shared-react/pkg/Context';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';
import { Props as HeaderProps } from './types';

export interface Props {}

export const Header: React.FC<Props & HeaderProps> = ({ ...props }) => {
  const isMobile = useContext(MobileContext);

  if (isMobile) {
    return <HeaderMobile {...props} />;
  }

  return <HeaderDesktop {...props} />;
};
Header.displayName = 'Header';

export default Header;
