
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { promiseMiddleware, localStorageMiddleware } from './middleware'
import reducer from './reducer'

//import devToolsEnhancer from 'remote-redux-devtools';
import { composeWithDevTools } from 'remote-redux-devtools'

//import { routerMiddleware } from 'react-router-redux'
//import { createBrowserHistory } from 'history'
//export const history = createBrowserHistory()
//Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history)
const composeEnhancers = composeWithDevTools({
  name: 'conduit',
  realtime: true,
  trace: true,
  port: 8000
})

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      //myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware
    )
  } else {
    return applyMiddleware(
      //myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware,
      createLogger()
    )
  }
}

export const store = createStore(
  reducer, composeEnhancers(getMiddleware())
  //reducer, composeWithDevTools(getMiddleware())
)
