import React from 'react'
import Banner from './banner'
import Posts from './posts'
import Tags from './tags'
import { connect } from 'react-redux'
import agent from '../../../agent'

import {
  HOME_LOADED,
  APPLY_TAG_FILTER,
  HOME_UNLOADED
} from '../../../constants/types'

const Promise = global.Promise

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({ type: HOME_UNLOADED })
})

class Home extends React.Component {

  UNSAFE_componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all'
    const postsPromise = this.props.token
      ? agent.Posts.feed
      : agent.Posts.all
    this.props.onLoad(
      tab,
      postsPromise,
      Promise.all([agent.Tags.getAll(), postsPromise()])
    )
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div className="home-page">
        <Banner
          token={this.props.token}
          appName={this.props.appName} />
        <div className="container page">
          <div className="row">
            <Posts />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
