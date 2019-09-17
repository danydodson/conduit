import React from 'react'
import agent from '../../../middleware/middle-agent'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  POST_ITEM_FAVORITED,
  POST_ITEM_UNFAVORITED
} from '../../../constants'

const FAVORITED_CLASS = 'post-btn-faved is-faved'
const NOT_FAVORITED_CLASS = 'post-btn-faved'

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: POST_ITEM_FAVORITED, payload: agent.Posts.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: POST_ITEM_UNFAVORITED, payload: agent.Posts.unfavorite(slug)
  }),
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
    <li className='post-preview'>

      <Link
        to={`/post/${post.slug}`}
        className='post-preview-link'>
        {/* <h1>{post.title}</h1> */}
        {/* <p>{post.description}</p> */}
        {/* <span>Read more...</span>  */}
        {post.uploads.map((upload, fileName) => {
          return (
            <figure class='post-preview-tint'>
              <img
                src={upload.response.body.secure_url}
                className='post-preview-img'
                alt={upload.fileName}
                key={fileName} />
            </figure>
          )
        })}
      </Link>

      <Link
        to={`/@${post.author.username}`}
        className='post-author-img-link'>
        <img
          src={post.author.image}
          alt={post.author.username}
          className='post-author-img' />
      </Link>

      <Link
        to={`/@${post.author.username}`}
        className="post-author-username" >
        {post.author.username}
      </Link>

      <button
        onClick={handleClick}
        className={favoriteButtonClass}>
        <i className="ion-heart"></i> {post.favoritesCount}
      </button>

    </li>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostPreview)
