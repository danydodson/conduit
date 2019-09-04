import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import agent from '../../../actions/agent'

import {
  POST_ITEM_DELETE_POST
} from '../../../constants/types'

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: POST_ITEM_DELETE_POST, payload })
})

const PostActions = props => {

  const post = props.post
  const del = () => {
    props.onClickDelete(agent.Posts.del(post.slug))
  }

  if (props.canModify) {
    return (
      <span>
        <Link
          to={`/editor/${post.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Post
        </Link>
        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Post
        </button>
      </span>
    )
  }
  return (
    <span>
    </span>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostActions)
