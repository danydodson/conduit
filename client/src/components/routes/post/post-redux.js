import React from 'react'
import { connect } from 'react-redux'
import PostMeta from './post-meta'
import CommentContainer from './comment'
import agent from '../../../agent'
import marked from 'marked'

import {
  POST_LOADED,
  POST_UNLOADED
} from '../../../constants/types'

const mapStateToProps = state => ({
  ...state.post,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: POST_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: POST_UNLOADED })
})

class Post extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Posts.get(this.props.match.params.id),
      agent.Comments.forPost(this.props.match.params.id)
    ]))
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {

    if (!this.props.post) return null

    const markup = { __html: marked(this.props.post.body, {}) }

    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username ===
      this.props.post.author.username

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.post.title}</h1>
            <PostMeta
              post={this.props.post}
              canModify={canModify} />
          </div>
        </div>
        <div className="container page">
          <div className="row post-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>
              <ul className="tag-list">
                {this.props.post.tagList.map(tag => {
                  return (
                    <li
                      className="tag-default tag-pill tag-outline"
                      key={tag}>
                      {tag}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <hr />
          <div className="article-actions">
          </div>
          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
