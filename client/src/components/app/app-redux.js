import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../../store'
import { push } from 'connected-react-router'

import { CloudinaryContext } from 'cloudinary-react'
import { CLOUD_NAME, CLOUD_PRESET } from '../../configs'

import FontsLoader from '../../helpers/load-fonts'
import Styles from './app-styles'

import Private from '../private'
import Header from '../header'
import Home from '../home'
import Post from '../post'
import Editor from '../editor'
import Login from '../login'
import Profile from '../profile'
import Favorites from '../favorites'
import Register from '../register'
import Settings from '../settings'

import agent from '../../agent'

import {
  APP_LOAD,
  AUTH_USER_LOGOUT,
  APP_REDIRECT_LOCATION
} from '../../actions'

const mapStateToProps = state => {
  return {
    appLoaded: state.app.appLoaded,
    appName: state.app.appName,
    currentUser: state.app.currentUser,
    redirectTo: state.app.redirectTo
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onClickLogout: () =>
    dispatch({ type: AUTH_USER_LOGOUT }),
  onRedirect: () =>
    dispatch({ type: APP_REDIRECT_LOCATION }),
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
    if (token) agent.setToken(token)
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  componentDidMount() {
    FontsLoader()
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <CloudinaryContext
          cloudName={CLOUD_NAME}
          uploadPreset={CLOUD_PRESET}>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
            onClickLogout={this.props.onClickLogout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Private path="/editor/:slug" component={Editor} />
            <Private path="/editor" component={Editor} />
            <Route path="/post/:id" component={Post} />
            <Private path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={Favorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
          <Styles />
        </CloudinaryContext>
      )
    }
    return (
      <CloudinaryContext
        cloudName={CLOUD_NAME}
        uploadPreset={CLOUD_PRESET}>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
        <Styles />
      </CloudinaryContext>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)