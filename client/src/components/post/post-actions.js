import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { GoTrashcan } from "react-icons/go"
import agent from '../../agent'
import crypto from 'crypto'

import {
  CLOUD_SECRET,
  CLOUD_DESTROY,
  CLOUD_KEY,
} from '../../configs'

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
  const getHash = hash => {
    return crypto.createHash('sha1').update(hash, 'utf8').digest('hex')
  }
  const sig = getHash('public_id=' + post.uploads[0].public_id + '&timestamp=' + post.uploads[0].version + CLOUD_SECRET)
  const req = CLOUD_DESTROY + 'public_id=' + post.uploads[0].public_id + '&timestamp=' + post.uploads[0].version + '&api_key=' + CLOUD_KEY + '&signature=' + sig

  const del = () => {
    const payload = agent.Uploads.delete(req, removePost.bind(this))
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
