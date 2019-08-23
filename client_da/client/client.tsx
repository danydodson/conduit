import 'react-hot-loader/patch';
import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import Modal from 'react-modal';
import initI18n from './i18n/client-i18n';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';
import { configureStore } from './store/configure-store';
import { getClientInstance } from '@wix/da-ddt';
import { AppState } from './types/store';
import { XHR_BASE_PATH } from '../constants';
import { DaAppWrapper } from '@wix/da-shared-react/pkg/DaApp';
import { configureHistoryListener } from '@wix/da-shared-react/pkg/redux/routing/history';

if (window.Sentry && process.env.NODE_ENV === 'production') {
  window.Sentry.onLoad(() => {
    window.Sentry.init({
      release: window['__APP_INFO__'],
      environment: 'production',
    });
  });
}

const ddt = getClientInstance();
ddt.replayServerSideLogs(window['__DDT__']);

const initialI18n = window['__INITIAL_I18N__'];

const initialState: AppState = window['__INITIAL_STATE__'];
delete window['__INITIAL_STATE__'];
const { store } = configureStore(initialState);
configureHistoryListener(store);
initI18n(initialI18n, store.getState().environment.isDebug);

wixAxiosConfig(axios, { baseURL: XHR_BASE_PATH });

Modal.setAppElement('#root');

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const AppLatest = require('./components/App');
    ReactDOM.render(
      <AppContainer>
        <DaAppWrapper store={store}>
          <AppLatest language={initialI18n.locale} />
        </DaAppWrapper>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
ReactDOM.hydrate(
  <DaAppWrapper store={store}>
    <App language={initialI18n.locale} />
  </DaAppWrapper>,
  document.getElementById('root')
);
