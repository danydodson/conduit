import React from 'react'
import { Link } from 'react-router-dom'
import PostActions from './post-actions'

const PostMeta = props => {

  const post = props.post
  
  return (
    <div className="article-meta">
      <Link to={`/@${post.author.username}`}>
        <img src={post.author.image} alt={post.author.username} />
      </Link>
      <div className="info">
        <Link to={`/@${post.author.username}`} className="author">
          {post.author.username}
        </Link>
        <span className="date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <PostActions canModify={props.canModify} post={post} />
    </div>
  )
}

export default PostMeta
