import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { store } from '../../store'

import Styles from './app-styles'
import Config from '../../config'
import { CloudinaryContext } from 'cloudinary-react'

import agent from '../../agent'
import Photos from '../routes/photos'
import Uploader from '../routes/uploader'
import Header from '../header'
import Home from '../routes/home'
import Article from '../routes/article'
import Editor from '../routes/editor'
import Login from '../routes/login'
import Profile from '../routes/profile'
import Favorites from '../routes/favorites'
import Register from '../routes/register'
import Settings from '../routes/settings'

import { LOGOUT, APP_LOAD, REDIRECT } from '../../constants/types'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
}

const mapDispatchToProps = dispatch => ({
  onClickLogout: () =>
    dispatch({ type: LOGOUT }),
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
    if (token) agent.setToken(token)
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <CloudinaryContext
            cloudName={Config.cloud_name}
            uploadPreset={'seesee'}>
            <Header
              appName={this.props.appName}
              currentUser={this.props.currentUser}
              onClickLogout={this.props.onClickLogout} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/editor/:slug" component={Editor} />
              <Route path="/editor" component={Editor} />
              <Route path="/article/:id" component={Article} />
              <Route path="/photos" component={Photos} />
              <Route path="/uploader/:slug" component={Uploader} />
              <Route path="/uploader" component={Uploader} />
              <Route path="/settings" component={Settings} />
              <Route path="/@:username/favorites" component={Favorites} />
              <Route path="/@:username" component={Profile} />
            </Switch>
          </CloudinaryContext>
          <Styles />
        </div>
      )
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
        <Styles />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)