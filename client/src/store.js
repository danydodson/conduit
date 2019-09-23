import { applyMiddleware, createStore } from 'redux'
import { promiseMiddleware, localStorageMiddleware } from './middleware/middle-auth'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

export const history = createBrowserHistory()

const myRouterMiddleware = routerMiddleware(history)

const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'SeeSee',
  hostname: 'localhost',
  port: 4100
})

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
  composeEnhancers(getMiddleware())
)
