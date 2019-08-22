import React from 'react'
import { connect } from 'react-redux'
import ListItem from '../../components/listitem'
import NavList from '../../components/navlist'
import Link from '../../components/link'
import Button from '../../components/button'

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
        <ListItem item={<Link to="/">Home</Link>} />
        <ListItem item={<Link to="/editor">Create Post</Link>} />
        <ListItem item={<Link to="/settings">Settings</Link>} />
        <ListItem item={<Button onClick={props.logout}>Logout</Button>} />
        <ListItem item={
          <Link to={`/@${props.currentUser.username}`}>
            <img alt={''} src={props.currentUser.image} />
            {props.currentUser.username}
          </Link>
        } />
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
