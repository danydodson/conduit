import React from 'react'
import ReactDOM from 'react-dom'
import { history, store } from './store'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { CLOUD_NAME, CLOUD_PRESET } from './configs'

import App from './components/app'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App cloudName={CLOUD_NAME} uploadPreset={CLOUD_PRESET} />
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'))
