import React from 'react'
import { Link } from 'react-router-dom'
import PostActions from './post-actions'

const PostMeta = props => {

  const post = props.post

  return (
    <div>

      <Link
        to={`/@${post.author.username}`}>
        <img
          src={post.author.image}
          alt={post.author.username} />
      </Link>

      <Link
        to={`/@${post.author.username}`}>
        {post.author.username}
      </Link>

      <span>
        {new Date(post.createdAt).toDateString()}
      </span>

      <PostActions
        canModify={props.canModify}
        post={post} />

    </div>
  )
}

export default PostMeta
