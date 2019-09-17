import React from 'react'
import { connect } from 'react-redux'
import Banner from './banner'
import Posts from './posts'
import Tags from './tags'
import agent from '../../middleware/middle-agent'

import {
  HOME_PAGE_LOADED,
  SET_TAG_FILTER,
  HOME_PAGE_UNLOADED,
} from '../../constants'
const Promise = global.Promise

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: SET_TAG_FILTER, tag, pager, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED }),
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
      <main className="home-page">

        <Banner
          token={this.props.token}
          appName={this.props.appName} />

        <Tags
          tags={this.props.tags}
          onClickTag={this.props.onClickTag} />

        <div className='main'>
          <Posts />
        </div>
        
      </main>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
