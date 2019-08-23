import React from 'react'
import { connect } from 'react-redux'
import Image from '../../components/image'
import NavList from '../../components/List'
import NavItem from '../../components/Item'
import Button from '../../components/button'
import Link from '../../components/link'
import Navbar from './Styles'

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

  if (!props.currentUser) {
    return (
      <>
        <NavItem item={<Link to="/">home</Link>} />
        <NavItem item={<Link to="/login">sign in</Link>} />
        <NavItem item={<Link to="/register">sign up</Link>} />
      </>
    )
  }

  return null
}

const LoggedInView = props => {

  if (props.currentUser) {
    return (
      <>
        <NavItem item={<Link to="/">Home</Link>} />
        <NavItem item={<Link to="/editor">Create Post</Link>} />
        <NavItem item={<Link to="/settings">Settings</Link>} />
        <NavItem item={<Button onClick={props.logout}>Logout</Button>} />
        <NavItem item={
          <Link to={`/@${props.currentUser.username}`}>
            <Image alt={''} src={props.currentUser.image} />
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
      <Navbar>
        <NavList>
          <NavItem item={<Link to="/">{this.props.appName.toLowerCase()}</Link>} />
          <LoggedOutView
            currentUser={this.props.currentUser} />
          <LoggedInView
            currentUser={this.props.currentUser}
            logout={this.props.onClickLogout} />
        </NavList>
      </Navbar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
