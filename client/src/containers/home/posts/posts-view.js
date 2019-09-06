import React from 'react'
import { connect } from 'react-redux'
import agent from '../../../agent'
import Posts from './posts-feed'

import {
  SET_VIEW_TAB
} from '../../../utilities/constants'

const mapStateToProps = state => ({
  ...state.posts,
  tags: state.home.tags,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: SET_VIEW_TAB, tab, pager, payload })
})

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault()
      props.onTabClick('feed', agent.Posts.feed, agent.Posts.feed())
    }

    return (
      <li className="nav-item">
        <button href=""
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}>
          Your Feed
        </button>
      </li>
    )
  }

  return null
}

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault()
    props.onTabClick('all', agent.Posts.all, agent.Posts.all())
  }

  return (
    <li className="nav-item">
      <button
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        Global Feed
      </button>
    </li>
  )
}

const TagFilterTab = props => {
  if (!props.tag) return null
  return (
    <li className="nav-item">
      <button href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </button>
    </li>
  )
}

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />
          <GlobalFeedTab tab={props.tab}
            onTabClick={props.onTabClick} />
          <TagFilterTab tag={props.tag} />
        </ul>
      </div>
      <Posts
        pager={props.pager}
        posts={props.posts}
        loading={props.loading}
        postsCount={props.postsCount}
        currentPage={props.currentPage} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
