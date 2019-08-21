import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../../store'
import { push } from 'connected-react-router'
import agent from '../../middleware/agent'

import Home from '../Home'
import Header from '../Pages/Header'
import Article from '../Article'
import Editor from '../Pages/Editor'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import Favorites from '../Pages/Favorites'
import Register from '../Pages/Register'
import Settings from '../Pages/Settings'

import GlobalStyle from '../../utilities/global'

import { APP_LOAD, REDIRECT } from '../../actions/types'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
})

class App extends React.Component {

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo))
      this.props.onRedirect()
    }
  }

  UNSAFE_componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={Favorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
          <GlobalStyle />
        </div>
      )
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
        <GlobalStyle />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
