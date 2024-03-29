import React from 'react'
import Comment from './comment-view'

const CommentList = props => {
  return (
    <div>
      {props.comments.map(comment => {
        return (
          <Comment
            comment={comment}
            currentUser={props.currentUser}
            slug={props.slug}
            key={comment.id} />
        )
      })}
    </div>
  )
}

export default CommentList
