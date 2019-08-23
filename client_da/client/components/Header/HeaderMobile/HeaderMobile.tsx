import React from 'react';
import classnames from 'classnames';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Props } from '../types';
import { BiLink, BiEventType } from '@wix/da-shared-react/pkg/biLogger';
import { FacetPageType } from '../../../../types/api';

import s from './HeaderMobile.scss';

class HeaderMobile extends React.Component<Props & WithTranslation> {
  navListRef: React.RefObject<any> = React.createRef();

  componentDidMount() {
    this.scrollToActive();
  }

  renderMenuItems() {
    const { activeMenuItem, t, items } = this.props;

    if (!items) {
      return null;
    }

    return (
      <ul className={s['nav-list']} ref={this.navListRef}>
        {items.map(menuItem => (
          <li key={menuItem.pageType} className={s['nav-list__item']}>
            <BiLink
              biData={{
                evid: BiEventType.CONTENT_NAVBAR_CLICK,
                link_name: menuItem.pageType,
              }}
              className={classnames(
                s['nav-list__item__link'],
                menuItem.pageType === activeMenuItem && s['active']
              )}
              href={menuItem.url}
              onClick={this.onMenuItemClick.bind(this, menuItem.pageType)}
            >
              <span>{t!(`browseHeader.page.${menuItem.pageType}`)}</span>
            </BiLink>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return <header className={s['root']}>{this.renderMenuItems()}</header>;
  }

  scrollToActive = () => {
    if (!this.navListRef.current) {
      return;
    }
    const activeRouteRef = Array.from(
      this.navListRef.current!.querySelectorAll('a')
    ).find(routeItem =>
      (routeItem as HTMLElement).classList.contains(s['active'])
    ) as HTMLElement;

    if (!activeRouteRef) {
      return;
    }

    const navRef = this.navListRef.current;

    if (!navRef) {
      return;
    }

    navRef.scrollLeft = activeRouteRef.offsetLeft - parseInt(s.paddingLeft, 10);
  };

  onMenuItemClick = (pageType: FacetPageType, event: React.MouseEvent<any>) => {
    const { changeToFacetPage } = this.props;
    if (!pageType) {
      return;
    }

    event.preventDefault();
    changeToFacetPage(pageType);
  };
}

export default withTranslation()(HeaderMobile);
