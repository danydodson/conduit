
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { promiseMiddleware } from './middleware'
import { localStorageMiddleware } from './middleware'
import { createLogger } from 'redux-logger'
import reducer from './reducer'

import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

//Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history)

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware
    )
  } else {
    return applyMiddleware(
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware,
      createLogger()
    )
  }
}

export const store = createStore(
  reducer, composeWithDevTools(getMiddleware())
)
