import React from 'react'
import agent from '../agent'

import { Route, Switch } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { store } from '../store'

import { APP_LOAD, REDIRECT } from '../constants/actionTypes'

import Header from './Header'

import Article from '../components/Article'
import Editor from '../components/Editor'
import Home from '../components/Home'
import Login from '../components/Login'
import Profile from '../components/Profile'
import ProfileFavorites from '../components/ProfileFavorites'
import Register from '../components/Register'
import Settings from '../components/Settings'

import GlobalStyle from '../styles/global-styles'

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo))
      this.props.onRedirect()
    }
  }

  componentWillMount() {
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
            <Route path="/@:username/favorites" component={ProfileFavorites} />
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

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// }

export default connect(mapStateToProps, mapDispatchToProps)(App)
