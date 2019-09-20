import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import agent from '../../middleware/middle-agent'

import {
  POST_ITEM_DELETE_POST
} from '../../constants'

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
        <Link to={`/editor/${post.slug}`}>
          {'Edit Post'}
        </Link>
        <button onClick={del}>
          {'Delete Post'}
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
