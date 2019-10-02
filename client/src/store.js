import { applyMiddleware, createStore } from 'redux'
import { promiseMiddleware, localStorageMiddleware } from './agent/agent-middleware'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import reducer from './reducers'

export const history = createBrowserHistory()

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
      createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error })
    )
  }
}

export const store = createStore(
  reducer(history),
  composeWithDevTools(getMiddleware())
)
