import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { GoTrashcan } from "react-icons/go"
import Signed from '../../helpers/sign-request'
import agent from '../../agent'

import {
  POST_ITEM_DELETE_POST,
  DROPZONE_MEDIA_DELETED,
} from '../../actions'

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: POST_ITEM_DELETE_POST, payload }),
  onDeleteUpload: (payload) =>
    dispatch({ type: DROPZONE_MEDIA_DELETED, payload }),
})

const PostActions = props => {
  const post = props.post

  const id = post.uploads[0].public_id
  const time = post.uploads[0].version

  const del = () => {
    const payload = agent.Uploads.delete(Signed(id, time), removePost.bind(this))
    props.onDeleteUpload(payload)
  }

  const removePost = () => {
    props.onClickDelete(agent.Posts.del(post.slug))
    console.log('done')
  }

  if (props.canModify) {
    return (
      <span>
        <Link to={`/editor/${post.slug}`}>
          {'Edit Post'}
        </Link>
        <GoTrashcan onClick={del} >
          {'Delete Post'}
        </GoTrashcan>
      </span>
    )
  }
  return <span></span>
}

export default connect(() => ({}), mapDispatchToProps)(PostActions)
