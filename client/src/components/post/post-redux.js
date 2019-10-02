import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PostMeta from './post-meta'
import Comments from './comment'
import agent from '../../agent'
import marked from 'marked'

import { CLOUD_DELIVERY } from '../../configs'

import {
  POST_ITEM_LOADED,
  POST_ITEM_UNLOADED
} from '../../actions'

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

    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.post.author.username

    const vr = this.props.post.uploads[0].version
    const id = this.props.post.uploads[0].public_id
    const fm = this.props.post.uploads[0].format

    return (
      <Fragment>

        <h1>{this.props.post.title}</h1>

        <PostMeta
          post={this.props.post}
          canModify={canModify} />

        <div dangerouslySetInnerHTML={markup}></div>

        {this.props.post.uploads.map((upload, public_id) => {
          return (
            <img
              key={public_id}
              alt={upload.fileName}
              src={`${CLOUD_DELIVERY}/w_333,c_scale/v${vr}/${id}.${fm}`} />
          )
        })}

        <ul>
          {this.props.post.tagList.map(tag => {
            return <li key={tag}>{tag}</li>
          })}
        </ul>

        <hr />

        <div className="article-actions"></div>

        <Comments
          comments={this.props.comments || []}
          errors={this.props.commentErrors}
          slug={this.props.match.params.id}
          currentUser={this.props.currentUser} />

      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
