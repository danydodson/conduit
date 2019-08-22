import React from 'react'
import { connect } from 'react-redux'
import { NavList, List } from '../../components/Lists/Styles'
import { Image } from '../../components/images/Styles'
import Item from '../../components/Items'
import Link from '../../components/link'
import Button from '../../components/button'
import { Nav } from './Styles'

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
        <Item item={<Link to="/">home</Link>} />
        <Item item={<Link to="/login">sign in</Link>} />
        <Item item={<Link to="/register">sign up</Link>} />
      </>
    )
  }

  return null
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <>
        <Item item={<Link to="/">Home</Link>} />
        <Item item={<Link to="/editor">Create Post</Link>} />
        <Item item={<Link to="/settings">Settings</Link>} />
        <Item item={<Button onClick={props.logout}>Logout</Button>} />
        <Item item={
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
      <Nav>
        <NavList>
          <Item item={
            <Link to="/">{this.props.appName.toLowerCase()}</Link>} />
          <List>
            <LoggedOutView
              currentUser={this.props.currentUser} />
            <LoggedInView
              currentUser={this.props.currentUser}
              logout={this.props.onClickLogout} />
          </List>
        </NavList>
      </Nav>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
