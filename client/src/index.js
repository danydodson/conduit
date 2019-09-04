import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from './store'
import { CloudinaryContext } from 'cloudinary-react'
import config from './config'
import App from './components/app'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CloudinaryContext
        cloudName={config.cloudName}
        uploadPreset={config.uploadPreset}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </CloudinaryContext>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'))
