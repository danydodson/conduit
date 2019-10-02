import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import agent from '../../agent'

import {
  POST_ITEM_DELETE_POST
} from '../../actions'

// import request from 'superagent'
// const CL_DELETE = `${process.env.REACT_APP_CL_DELETE}`

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: POST_ITEM_DELETE_POST, payload })
})

const PostActions = props => {

  const post = props.post

  // const removeFromCloud = () => {
  //   request
  //     .post(CL_DELETE)
  //     .set('Content-Type', 'application/json')
  //     .set('X-Requested-With', 'XMLHttpRequest')
  //     .send({ token: `${post.uploads[0].response.body.delete_token}` })
  //     .then(removePost)
  //     .catch(err => console.log(err))
  // }

  const removePost = () => {
    props.onClickDelete(agent.Posts.del(post.slug))
  }

  if (props.canModify) {
    return (
      <span>
        <Link to={`/editor/${post.slug}`}>
          {'Edit Post'}
        </Link>
        <button onClick={removePost}>
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
