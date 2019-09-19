import React from 'react'
import { connect } from 'react-redux'
import PostMeta from './post-meta'
import CommentContainer from './comment'
import agent from '../../middleware/middle-agent'
import marked from 'marked'

import {
  POST_ITEM_LOADED,
  POST_ITEM_UNLOADED
} from '../../constants'

const BASE = process.env.REACT_APP_CL_BASE

const mapStateToProps = state => ({
  ...state.post,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: POST_ITEM_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: POST_ITEM_UNLOADED })
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

    const canModify = this.props.currentUser
      && this.props.currentUser.username
      === this.props.post.author.username

    const resource_type = this.props.post.uploads[0].response.body.resource_type
    const type = this.props.post.uploads[0].response.body.type
    const version = this.props.post.uploads[0].response.body.version
    const format = this.props.post.uploads[0].response.body.format

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

              {this.props.post.uploads.map((upload, public_id) => {
                return (
                  resource_type === 'video' ? (
                    <video
                      key={public_id}
                      src={`${BASE}/${resource_type}/${type}/v${version}/${upload.response.body.public_id}.${format}`}
                      width='333'
                      height='100'
                      controls>
                      <p>This browser does not support the HTML5 video element.</p>
                    </video>
                  ) : (
                      <img
                        key={public_id}
                        src={`${BASE}/${resource_type}/${type}/w_333,c_scale/v${version}/${upload.response.body.public_id}.${format}`}
                        alt={upload.fileName} />
                    )
                )
              })}

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
