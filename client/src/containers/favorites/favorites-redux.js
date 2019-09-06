import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Profile, mapStateToProps } from '../profile/profile-redux'
import agent from '../../agent'

import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../../utilities/constants'

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_PAGE_UNLOADED })
})

class Favorites extends Profile {
  UNSAFE_componentWillMount() {
    this.props.onLoad(page => agent.Posts.favoritedBy(this.props.match.params.username, page), Promise.all([
      agent.Profile.get(this.props.match.params.username),
      agent.Posts.favoritedBy(this.props.match.params.username)
    ]))
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}`}>
            My Posts
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Posts
          </Link>
        </li>
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
