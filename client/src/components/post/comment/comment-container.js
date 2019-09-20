import React from 'react'
import { Link } from 'react-router-dom'
import CommentInput from './comment-input'
import CommentList from './comment-feed'

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <div>
        <list-errors errors={props.errors}></list-errors>
        <CommentInput slug={props.slug} currentUser={props.currentUser} />
        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    )
  } else {
    return (
      <div>
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this post.
        </p>
        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    )
  }
}

export default CommentContainer
