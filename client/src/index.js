import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { CLOUD_NAME, CLOUD_PRESET } from './configs/cloud-configs'
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from './store'

import App from './components/app'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App cloudName={CLOUD_NAME} uploadPreset={CLOUD_PRESET} />
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'))
