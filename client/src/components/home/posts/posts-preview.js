import React from 'react'
import { connect } from 'react-redux'
import agent from '../../../agent'

import imgSizes from './images/get-sizes'
import srcUrl from './images/get-srcurl'
import srcSet from './images/get-srcset'

import { Figure } from './styles/figure-tint'
import { Preview } from './styles/article-preview'
import { PreviewImage } from './styles/img-preview'
import { PreviewLink } from './styles/link-preview'
import { AuthorLink } from './styles/link-authimg'
import { AuthorName } from './styles/link-authname'
import { AuthorImage } from './styles/img-author'
import { Heart } from './styles/svg-heart'
import { Cash } from './styles/svg-cash'

// import LikeButton from '../../buttons/like-button'

import {
  POST_ITEM_FAVORITED,
  POST_ITEM_UNFAVORITED
} from '../../../actions'

const mapDispatchToProps = dispatch => ({
  favorite: slug =>
    dispatch({ type: POST_ITEM_FAVORITED, payload: agent.Posts.favorite(slug) }),
  unfavorite: slug =>
    dispatch({ type: POST_ITEM_UNFAVORITED, payload: agent.Posts.unfavorite(slug) }),
})

const PostPreview = props => {

  const post = props.post

  const handleClick = ev => {
    ev.preventDefault()
    if (post.favorited) {
      props.unfavorite(post.slug)
    } else {
      props.favorite(post.slug)
    }
  }

  return (
    <Preview
      itemScope
      itemProp='image'
      itemType='http://schema.org/ImageObject'>

      <PreviewLink
        to={`/post/${post.slug}`}
        itemProp="contentUrl"
        title={`view the post by ${post.author.username}`}>

        <Figure>
          {
            post.uploads.map((upload, fileName) => {
              return (
                <PreviewImage
                  key={fileName}
                  sizes={imgSizes}
                  srcSet={srcSet(upload)}
                  src={srcUrl(upload)}
                  alt={upload.fileName}
                  itemProp='previewImage' />
              )
            })
          }
        </Figure>

      </PreviewLink>

      <AuthorLink
        to={`/@${post.author.username}`}>
        <AuthorImage
          src={post.author.image}
          className='pp-author-img'
          alt={`go to ${post.author.username}'s profile`} />
      </AuthorLink>

      <AuthorName
        to={`/@${post.author.username}`}
        title={`go to ${post.author.username}'s profile`}>
        {post.author.username}
      </AuthorName>

      {post.purchasable ?
        <Cash
          onClick={handleClick}
          title='This item is purchasable' />
        :
        <Cash
          onClick={handleClick}
          title='This item is purchasable' />
      }

      <Heart
        title='isfaved'
        onClick={handleClick}
        favorited={post.favorited ? 1 : 0}
      />

      {/* <LikeButton
        liked={post.favorited ? 1 : 0}
        onClick={handleClick}
      /> */}


    </Preview>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostPreview)