import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  LOGOUT,
  SETTINGS_PAGE_UNLOADED
} from '../constants/actionTypes'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
})

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            <i className="ion-home"></i>&nbsp; Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <i className="ion-log-in"></i>&nbsp; Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <i className="ion-person-add"></i>&nbsp; Sign up
          </Link>
        </li>

      </ul>
    )
  }
  return null
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            <i className="ion-home"></i>&nbsp; Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp; Create Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp; Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to=""
            className="nav-link"
            onClick={props.logout}>
            <i className="ion-log-out"></i>&nbsp; Logout
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    )
  }

  return null
}

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView
            currentUser={this.props.currentUser} />

          <LoggedInView
            currentUser={this.props.currentUser}
            logout={this.props.onClickLogout} />
        </div>
      </nav>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
