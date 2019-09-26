import React from 'react'
import { connect } from 'react-redux'
import agent from '../../middleware/middle-agent'
import Mediums from './mediums'
import Posts from './posts'

import {
  HOME_PAGE_LOADED,
  SET_MEDIUM_FILTER,
  HOME_PAGE_UNLOADED,
} from '../../constants'

const Promise = global.Promise

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  dropActive: state.common.dropActive,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onClickMedium: (medium, pager, payload) =>
    dispatch({ type: SET_MEDIUM_FILTER, medium, pager, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED }),
})

class Home extends React.Component {

  UNSAFE_componentWillMount() {
    const tab = this.props.token
      ? 'feed'
      : 'all'

    const postsPromise = this.props.token
      ? agent.Posts.feed
      : agent.Posts.all

    this.props.onLoad(
      tab,
      postsPromise,
      Promise.all([agent.Mediums.getAll(),
      postsPromise()]))
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {

    return (

      <main className="home-page Status">
        {/* <Banner
          token={this.props.token}
          appName={this.props.appName} /> */}

        {/* <Tags
          tags={this.props.tags}
          onClickTag={this.props.onClickTag} /> */}

        <Mediums
          mediums={this.props.mediums}
          onClickMedium={this.props.onClickMedium} />

        <Posts />
      </main>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
