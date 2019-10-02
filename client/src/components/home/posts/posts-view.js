import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import agent from '../../../agent'

import PostsFeed from './posts-feed'
import { PageTablist } from './styles/ul-pagetab'
import { PageTabItem } from './styles/li-pagetab'

import { SET_VIEW_TAB } from '../../../actions'

const mapStateToProps = state => ({
  ...state.posts,
  tags: state.home.tags,
  token: state.app.token
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
      <PageTabItem>
        <button href=""
          className={props.tab === 'feed' ? '' : ''}
          onClick={clickHandler}>
          {'Your Feed'}
        </button>
      </PageTabItem>
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
    <PageTabItem>
      <button
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        {'Global Feed'}
      </button>
    </PageTabItem>
  )
}

const TagFilterTab = props => {
  if (!props.tag) return null
  return (
    <PageTabItem>
      <button href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </button>
    </PageTabItem>
  )
}

const MainView = props => {
  return (
    <Fragment>
      <PageTablist>
        <YourFeedTab
          token={props.token}
          tab={props.tab}
          onTabClick={props.onTabClick} />
        <GlobalFeedTab
          tab={props.tab}
          onTabClick={props.onTabClick} />
        <TagFilterTab
          tag={props.tag} />
      </PageTablist>
      <PostsFeed
        pager={props.pager}
        posts={props.posts}
        loading={props.loading}
        postsCount={props.postsCount}
        currentPage={props.currentPage} />
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
