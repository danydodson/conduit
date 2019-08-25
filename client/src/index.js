import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
//import { CloudinaryContext } from 'cloudinary-react'
import { history, store } from './store'

import App from './components/app'

// const CLOUD = process.env.CLOUD
// const PRESET = process.env.PRESET

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <CloudinaryContext cloudName={CLOUD} uploadPreset={PRESET}> */}
      <Switch>
        <Route path="/" component={App} />
      </Switch>
      {/* </CloudinaryContext> */}
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'))
