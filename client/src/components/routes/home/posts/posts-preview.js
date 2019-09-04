import React from 'react'
import agent from '../../../../agent'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  POST_FAVORITED,
  POST_UNFAVORITED
} from '../../../../constants/types'

const FAVORITED_CLASS = 'btn btn-sm btn-primary'
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary'

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: POST_FAVORITED,
    payload: agent.Posts.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: POST_UNFAVORITED,
    payload: agent.Posts.unfavorite(slug)
  })
})

const PostPreview = props => {
  const post = props.post
  const favoriteButtonClass = post.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS

  const handleClick = ev => {
    ev.preventDefault()
    if (post.favorited) {
      props.unfavorite(post.slug)
    } else {
      props.favorite(post.slug)
    }
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${post.author.username}`}>
          <img
            src={post.author.image}
            alt={post.author.username} />
        </Link>
        <div className="info">
          <Link className="author"
            to={`/@${post.author.username}`}>
            {post.author.username}
          </Link>
          <span className="date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <div className="pull-xs-right">
          <button
            className={favoriteButtonClass}
            onClick={handleClick}>
            <i className="ion-heart"></i>
            {post.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/post/${post.slug}`} className="preview-link">

        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {post.tagList.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            )
          })}
        </ul>
      </Link>
    </div>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostPreview)
