import React from 'react'
import { connect } from 'react-redux'
import agent from '../../../middleware/middle-agent'
import imgSizes from './images/image-sizes'
import srcSet from './images/image-srcset'

import { Preview, PrevLink, PrevImg, AuthLink, AuthImg, AuthName } from './posts-styles'

import { Heart } from './styles/svg-heart'
import { Cash } from './styles/svg-cash'

import { Figure } from './styles/figure-tint'

import { POST_ITEM_FAVORITED, POST_ITEM_UNFAVORITED } from '../../../constants'

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

      <PrevLink
        to={`/post/${post.slug}`}
        itemProp="contentUrl"
        title={`view the post by ${post.author.username}`}>

        <Figure>
          {
            post.uploads.map((upload, fileName) => {
              return (
                <PrevImg
                  key={fileName}
                  sizes={imgSizes}
                  srcSet={srcSet(upload)}
                  // src={size10}
                  alt={upload.fileName}
                  itemProp='previewImage' />
              )
            })
          }
        </Figure>

      </PrevLink>

      <AuthLink
        to={`/@${post.author.username}`}>
        <AuthImg
          src={post.author.image}
          className='pp-author-img'
          alt={`go to ${post.author.username}'s profile`} />
      </AuthLink>

      <AuthName
        to={`/@${post.author.username}`}
        title={`go to ${post.author.username}'s profile`}>
        {post.author.username}
      </AuthName>

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
        favorited={post.favorited ? true : false} />

    </Preview>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostPreview)