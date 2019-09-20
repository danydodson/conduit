import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Delete from './comment-delete'

const Comment = props => {

  const comment = props.comment

  const show = props.currentUser &&
    props.currentUser.username === comment.author.username

  return (
    <Fragment>

      <p>{comment.body}</p>

      <Link
        to={`/@${comment.author.username}`}>
        <img
          src={comment.author.image}
          alt={comment.author.username} />
      </Link>

      <Link
        to={`/@${comment.author.username}`}>
        {comment.author.username}
      </Link>

      <span>
        {new Date(comment.createdAt).toDateString()}
      </span>

      <Delete
        show={show}
        slug={props.slug}
        commentId={comment.id} />

    </Fragment>
  )
}

export default Comment
