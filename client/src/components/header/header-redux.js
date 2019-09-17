import React from 'react'
import { Link } from 'react-router-dom'
import AppName from './title'
import Searchbox from '../searchbox'

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className='nav-list'>
        <li className='nav-item'>
          <Link to="/login" className="nav-link">
            {`Sign in`}
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/register" className="nav-link">
            {`Sign up`}
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
      <ul className='nav-list'>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {'Home'}
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/editor" className="nav-link">
            {`Collections`}
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/editor" className="nav-link">
            {`Create Post`}
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>
          </Link>
        </li>
        {/* <li className='nav-item'>
          <button onClick={props.onClickLogout} className="nav-link">
            <i className="ion-log-out"></i>&nbsp;{'Logout'}
          </button>
        </li> */}
        <li className='nav-item'>
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img className='user-img'
              src={props.currentUser.image}
              alt={props.currentUser.username} />
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
      <header className='header'>
        <nav>
          <AppName
            appName={this.props.appName} />
          <Searchbox />
          <LoggedOutView
            currentUser={this.props.currentUser} />
          <LoggedInView
            currentUser={this.props.currentUser}
            onClickLogout={this.props.onClickLogout} />
        </nav>
      </header>
    )
  }
}

export default Header
