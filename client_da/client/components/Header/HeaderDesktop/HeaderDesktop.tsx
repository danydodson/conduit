import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import throttle from 'lodash/throttle';
import classnames from 'classnames';
import StandardMenu from '@wix/da-shared-react/pkg/Dropdown/Preset/StandardMenu';
import { Props } from '../types';
import SearchBar from '../Search/SearchBar';
import {
  BiLink,
  BiEventType,
  BiDataHook,
} from '@wix/da-shared-react/pkg/biLogger';
import { FacetPageType } from '../../../../types/api';

import s from './HeaderDesktop.scss';

export interface State {
  overflowingItems: number;
}

const THROTTLE_TIMEOUT = 200;

export class Header extends React.Component<Props & WithTranslation, State> {
  readonly state: State = {
    overflowingItems: -1, // Converts to true for us to know More width
  };

  mounted: boolean = false;

  navListRef: React.RefObject<HTMLUListElement> = React.createRef();

  itemsWidthsArray: number[] = [];

  foldMenuIfNeeded = throttle(
    () => {
      const listElement = this.navListRef.current;
      if (!listElement) {
        return;
      }

      if (!this.itemsWidthsArray.length) {
        this.itemsWidthsArray = Array.prototype.map.call(
          listElement.children,
          item =>
            item.getBoundingClientRect().width + parseInt(s['item-margin'], 10)
        );
      }

      const allItemsWidthsSum = this.itemsWidthsArray.reduce(
        (a, b) => a + b,
        0
      );

      const moreItemWidth = this.itemsWidthsArray[
        this.itemsWidthsArray.length - 1
      ];

      let overflowingItems = 0;

      const containerWidth = listElement.getBoundingClientRect().width;
      if (allItemsWidthsSum - moreItemWidth >= containerWidth) {
        let currentItemsWidthsSum = 0;

        for (const widthItem of this.itemsWidthsArray) {
          currentItemsWidthsSum += widthItem;

          if (currentItemsWidthsSum + moreItemWidth >= containerWidth) {
            overflowingItems++;
          }
        }
      }

      this.setState({ overflowingItems });
    },
    THROTTLE_TIMEOUT,
    { leading: true }
  );

  renderMenuItems() {
    const { activeMenuItem, t, items } = this.props;

    if (!items) {
      return null;
    }

    const menuLength = items.length;
    const { overflowingItems } = this.state;
    const horizontalMenu = items.slice(0, menuLength - overflowingItems + 1);
    const moreMenu = items.slice(menuLength - overflowingItems + 1, menuLength);

    return (
      <ul className={s['nav-list']} ref={this.navListRef}>
        {horizontalMenu.map(menuItem => (
          <li key={menuItem.pageType} className={s['nav-list__item']}>
            <BiLink
              biData={{
                evid: BiEventType.CONTENT_NAVBAR_CLICK,
                link_name: menuItem.pageType,
              }}
              className={classnames(
                s['nav-list__item__link'],
                this.isMenuActive(menuItem.pageType, activeMenuItem) &&
                  s['active']
              )}
              href={menuItem.url}
              onClick={this.onMenuItemClick.bind(this, menuItem.pageType)}
            >
              <span className={s['nav-item']}>
                {t!(`browseHeader.page.${menuItem.pageType}`)}
              </span>
            </BiLink>
          </li>
        ))}

        {!!overflowingItems && (
          <li
            className={classnames(
              s['nav-list__item'],
              s['nav-list__item--more'],
              !this.mounted && s['hidden']
            )}
          >
            <span className={s['nav-list__item__link']}>
              {t!('browseHeader.more')}
            </span>
            <StandardMenu
              lightText
              className={s['more-list']}
              itemClassName={s['more-list__item']}
              items={moreMenu.map(menuItem => ({
                link: menuItem.url,
                label: t!(`browseHeader.page.${menuItem.pageType}`),
                onClick: this.onMenuItemClick.bind(this, menuItem.pageType),
                componentClass: BiLink,
                componentProps: {
                  biData: {
                    evid: BiEventType.CONTENT_NAVBAR_CLICK,
                    link_name: menuItem.pageType,
                  },
                },
              }))}
            />
          </li>
        )}
      </ul>
    );
  }

  // TODO this might need to be backend but for this
  // will act as compat layer...
  isMenuActive(pageType, active) {
    if (pageType === 'browse_home' && active === 'deviations') {
      return true;
    }
    return pageType === active;
  }

  componentWillReceiveProps() {
    this.foldMenuIfNeeded();
  }

  componentDidMount() {
    this.mounted = true;
    this.foldMenuIfNeeded();
    window.addEventListener('resize', this.foldMenuIfNeeded);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.foldMenuIfNeeded);
  }

  render() {
    const {
      estTotalTotal,
      filterTags,
      isStuck,
      pageType,
      selectedTags,
      isSearchPage,
      searchTerm,
    } = this.props;

    return (
      <div className={s['root']}>
        {isSearchPage && (
          <SearchBar
            searchTerm={searchTerm}
            filterTags={filterTags}
            selectedTags={selectedTags}
            pageType={pageType}
            estTotalTotal={estTotalTotal}
          />
        )}
        <header
          className={classnames(s['header'], isStuck && s['stuck'])}
          data-hook={BiDataHook.DEVIATION_NAV}
        >
          {this.renderMenuItems()}
        </header>
      </div>
    );
  }

  onMenuItemClick = (pageType: FacetPageType, event: React.MouseEvent<any>) => {
    const { changeToFacetPage } = this.props;
    if (!pageType) {
      return;
    }

    // Only handle left clicks
    if (!this.isLeftClick(event)) {
      return;
    }

    // modifier keys are a nope
    if (event.metaKey || event.altKey || event.shiftKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    changeToFacetPage(pageType);
  };

  isLeftClick(event: React.MouseEvent<any>) {
    if (event.hasOwnProperty('buttons') && event.buttons) {
      return event.buttons === 1;
    }
    const button = event.nativeEvent.which || event.button;
    return button < 2;
  }
}

export default withTranslation()(Header);
