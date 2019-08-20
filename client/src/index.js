import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
//import { history } from './store'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { ConnectedRouter } from 'react-router-redux'

import App from './components/App'

ReactDOM.render((
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
    {/* </ConnectedRouter> */}
  </Provider>

), document.getElementById('root'))
