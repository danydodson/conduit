import React from 'react'
import { connect } from 'react-redux'
import ListItem from '../../components/ListItem'
import NavList from '../../components/NavList'
import Link from '../../components/Link'

import {
  LOGOUT,
  SETTINGS_PAGE_UNLOADED
} from '../../actions/types'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
})

const LoggedOutView = props => {
  if (!props.to) {
    return (
      <>
        <ListItem item={<Link to="/">home</Link>} />
        <ListItem item={<Link to="/login">sign in</Link>} />
        <ListItem item={<Link to="/register">sign up</Link>} />
      </>
    )
  }

  return null
}


const LoggedInView = props => {
  if (props.currentUser) {
    return (

      <>

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
            <img
              className="user-pic"
              src={props.currentUser.image}
              alt={''} />
            {props.currentUser.username}
          </Link>
        </li>
      </>

    )
  }

  return null
}

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light flex">

        <NavList>
          <ListItem item={
            <Link to="/">{this.props.appName.toLowerCase()}</Link>} />
          <LoggedOutView
            currentUser={this.props.currentUser} />
          <LoggedInView
            currentUser={this.props.currentUser}
            logout={this.props.onClickLogout} />
        </NavList>

      </nav>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
