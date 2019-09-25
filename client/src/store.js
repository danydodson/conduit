import { applyMiddleware, createStore } from 'redux'
import { promiseMiddleware, localStorageMiddleware } from './middleware/middle-auth'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
// import { composeWithDevTools } from 'remote-redux-devtools'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
// import devToolsEnhancer from 'remote-redux-devtools'

export const history = createBrowserHistory()

const myRouterMiddleware = routerMiddleware(history)

// const composeEnhancers = composeWithDevTools({ realtime: true, name: 'SeeSee', hostname: 'localhost', port: 8000, trace: true, suppressConnectErrors: true, })

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
