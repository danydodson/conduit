import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from './store'
// import { CloudinaryContext } from 'cloudinary-react'
// import { CLOUD_NAME, CLOUD_PRESET } from './configs/cloud-configs'
// import { Route } from 'react-router-dom'
import { CLOUD_NAME, CLOUD_PRESET } from './configs/cloud-configs'

import App from './components/app'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <CloudinaryContext
        cloudName={CLOUD_NAME}
        uploadPreset={CLOUD_PRESET}> */}
      {/* <Switch> */}

      <App
        cloudName={CLOUD_NAME}
        uploadPreset={CLOUD_PRESET} />

      {/* <Route path="/" component={App} />*/}
      {/* </Switch> */}
      {/*</CloudinaryContext> */}
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'))
