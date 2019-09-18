import React from 'react'
import AppName from './title'
import Searchbox from '../searchbox'

import {
  Head,
  NavList,
  NavItem,
  NavLink,
  UserImg,
} from './header-styles'

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <NavList>
        <NavItem>
          <NavLink to="/login">{`Sign in`}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/register">{`Sign up`}</NavLink>
        </NavItem>
      </NavList>
    )
  }
  return null
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <NavList>
        <NavItem>
          <NavLink to="/">{'Home'}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/editor">{`Collections`}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/editor">{`Create`}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/settings"><i className="ion-gear-a"></i></NavLink>
        </NavItem>
        {/* <NavItem>
          <button onClick={props.onClickLogout} className="nav-link">
            <i className="ion-log-out"></i>&nbsp;{'Logout'}
          </button>
        </NavItem> */}
        <NavItem>
          <NavLink to={`/@${props.currentUser.username}`}>
            <UserImg
              src={props.currentUser.image}
              alt={props.currentUser.username} />
          </NavLink>
        </NavItem>
      </NavList>
    )
  }

  return null
}

class Header extends React.Component {

  render() {
    return (
      <Head>
        <AppName
          appName={this.props.appName} />
        <Searchbox />
        <LoggedOutView
          currentUser={this.props.currentUser} />
        <LoggedInView
          currentUser={this.props.currentUser}
          onClickLogout={this.props.onClickLogout} />
      </Head>
    )
  }
}

export default Header
