import 'react-dates/initialize';
import React from 'react';
import DaApp from '@wix/da-shared-react/pkg/DaApp';
import { Link, Meta } from 'react-head';
import { HeaderBehavior } from '@wix/da-shared-react/pkg/types/headerBehavior';
import SiteHeader from '@wix/da-shared-react/pkg/SiteHeader';
import { ThemeOptions } from '@wix/da-shared-react/pkg/publicSession/types';
import { RuntimeEnvironment } from '@wix/da-shared-react/pkg/types';
import { ChangeRoutePayload } from '../../actions/app';
import { FacetPageType } from '../../../types/api';
import { Pages, BiView } from '../../../constants';
import { BiLoggerContextProvider } from '@wix/da-shared-react/pkg/biLogger';
import BrowsePage from '../BrowsePage';
import SearchPage from '../SearchPage';
import DailyDeviationPage from '../DailyDeviationPage';
import TagPage from '../TagPage';
import classnames from 'classnames';
import s from './App.scss';

export interface Props {
  language: string;
  isMobile: boolean;
  pageTitle: string;
  pageDescription?: string;
  seoCanonical: string;
  page: Pages;
  biView?: BiView;
  pageType?: FacetPageType;
  theme?: ThemeOptions;
  environment?: RuntimeEnvironment;
  seoNavigation: {
    next?: string;
    prev?: string;
  };
  changeRoute: (params: ChangeRoutePayload) => void;
  appLoaded: () => void;
}

export interface State {
  isError: boolean;
}

class App extends React.Component<Props, State> {
  readonly state: State = {
    isError: false,
  };

  componentDidMount() {
    this.props.appLoaded();
  }

  componentDidCatch() {
    this.setState({ isError: true });
  }

  render() {
    const {
      biView,
      page,
      pageType,
      pageDescription,
      environment,
      language,
      pageTitle,
      seoCanonical: pageUrl,
      seoNavigation: { next, prev },
    } = this.props;
    const isSearch = page === Pages.Search;
    const isTagPage = page === Pages.Tag;

    return (
      <BiLoggerContextProvider
        value={{
          view: biView,
          component: pageType,
        }}
      >
        <DaApp
          headTags={{
            pageTitle,
            pageDescription,
            language,
            environment,
            pageUrl,
          }}
          backToTop={{ scrollToY: 0 }}
        >
          {next && <Link rel="next" href={next} />}
          {prev && <Link rel="prev" href={prev} />}
          {isSearch && <Meta name="robots" content="noindex" />}
          {!this.state.isError && (
            <>
              {this.renderHeader()}
              <div
                className={classnames(
                  s['content-container'],
                  isTagPage && s['tag-container']
                )}
              >
                {this.renderPage()}
              </div>
            </>
          )}
        </DaApp>
      </BiLoggerContextProvider>
    );
  }

  renderPage() {
    const { page } = this.props;

    switch (page) {
      case Pages.DailyDeviation:
        return <DailyDeviationPage />;
      case Pages.Search:
        return <SearchPage />;
      case Pages.Tag:
        return <TagPage />;
      default:
        return <BrowsePage />;
    }
  }

  renderHeader() {
    const { environment } = this.props;
    // TODO: set active item correctly
    return (
      <SiteHeader
        environment={environment}
        activeMainMenuItem="browse"
        mobileBehavior={HeaderBehavior.STICKY}
      />
    );
  }
}

export default App;
