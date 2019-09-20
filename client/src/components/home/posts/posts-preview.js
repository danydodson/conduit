import React from 'react'
import agent from '../../../middleware/middle-agent'
import { connect } from 'react-redux'

import {
  Preview,
  PrevLink,
  PrevTint,
  PrevImg,
  AuthLink,
  AuthImg,
  AuthName,
  BuyButton,
  FavButton
} from './posts-styles'

import {
  POST_ITEM_FAVORITED,
  POST_ITEM_UNFAVORITED
} from '../../../constants'

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: POST_ITEM_FAVORITED,
    payload: agent.Posts.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: POST_ITEM_UNFAVORITED,
    payload: agent.Posts.unfavorite(slug)
  }),
})

const PostPreview = props => {
  const post = props.post
  const handleClick = e => {
    e.preventDefault()
    if (post.favorited) {
      props.unfavorite(post.slug)
    } else {
      props.favorite(post.slug)
    }
  }

  const BASE = `${process.env.REACT_APP_CL_BASE}`
  const name = `${props.post.uploads[0].fileName}`
  const type = `${props.post.uploads[0].response.body.type}`
  const vs = `v${props.post.uploads[0].response.body.version}`
  const format = `${props.post.uploads[0].response.body.format}`
  const rs = `${props.post.uploads[0].response.body.resource_type}`
  const med = `${props.post.medium}`
  const opts = 'c_fit,q_80,'

  const sizes = `
  (min-width: 1335px) 416px, 
  (min-width: 992px) calc(calc(100vw - 72px) / 3), 
  (min-width: 768px) calc(calc(100vw - 48px) / 2), 
  100vw`

  const s01 = `${BASE}/${rs}/${type}/${opts}w_100/${vs}/${med}/${name}.${format}`
  const s02 = `${BASE}/${rs}/${type}/${opts}w_200/${vs}/${med}/${name}.${format}`
  const s03 = `${BASE}/${rs}/${type}/${opts}w_300/${vs}/${med}/${name}.${format}`
  const s04 = `${BASE}/${rs}/${type}/${opts}w_400/${vs}/${med}/${name}.${format}`
  const s05 = `${BASE}/${rs}/${type}/${opts}w_500/${vs}/${med}/${name}.${format}`
  const s06 = `${BASE}/${rs}/${type}/${opts}w_600/${vs}/${med}/${name}.${format}`
  const s07 = `${BASE}/${rs}/${type}/${opts}w_700/${vs}/${med}/${name}.${format}`
  const s08 = `${BASE}/${rs}/${type}/${opts}w_800/${vs}/${med}/${name}.${format}`
  const s09 = `${BASE}/${rs}/${type}/${opts}w_900/${vs}/${med}/${name}.${format}`
  const s10 = `${BASE}/${rs}/${type}/${opts}w_1000/${vs}/${med}/${name}.${format}`
  const s11 = `${BASE}/${rs}/${type}/${opts}w_1100/${vs}/${med}/${name}.${format}`
  const s12 = `${BASE}/${rs}/${type}/${opts}w_1200/${vs}/${med}/${name}.${format}`
  const s13 = `${BASE}/${rs}/${type}/${opts}w_1296/${vs}/${med}/${name}.${format}`
  const s14 = `${BASE}/${rs}/${type}/${opts}w_1400/${vs}/${med}/${name}.${format}`
  const s15 = `${BASE}/${rs}/${type}/${opts}w_1600/${vs}/${med}/${name}.${format}`
  const s16 = `${BASE}/${rs}/${type}/${opts}w_1800/${vs}/${med}/${name}.${format}`
  const s17 = `${BASE}/${rs}/${type}/${opts}w_2000/${vs}/${med}/${name}.${format}`
  const s18 = `${BASE}/${rs}/${type}/${opts}w_2200/${vs}/${med}/${name}.${format}`
  const s19 = `${BASE}/${rs}/${type}/${opts}w_2400/${vs}/${med}/${name}.${format}`
  const s20 = `${BASE}/${rs}/${type}/${opts}w_2592/${vs}/${med}/${name}.${format}`

  return (
    <Preview
      itemScope
      itemProp='image'
      itemType='http://schema.org/ImageObject'>

      <PrevLink
        to={`/post/${post.slug}`}
        title={`view the ${rs} by ${post.author.username}`}
        itemProp="contentUrl">
        <PrevTint>
          {post.uploads.map((upload, fileName) => {
            return (
              rs === 'video' ? null : (
                <PrevImg
                  key={fileName}
                  sizes={sizes}
                  srcSet={`
                    ${s01} 100w, ${s02} 200w, ${s03} 300w, ${s04} 400w, ${s05} 500w, 
                    ${s06} 600w, ${s07} 700w, ${s08} 800w, ${s09} 900w, ${s10} 1000w, 
                    ${s11} 1100w, ${s12} 1200w, ${s13} 1296w, ${s14} 1400w, ${s15} 1600w, 
                    ${s16} 1800w, ${s17} 2000w, ${s18} 2200w, ${s19} 2400w, ${s20} 2592w`
                  }
                  src={s10}
                  alt={upload.fileName}
                  itemProp='previewImage' />
              )
            )
          })}
        </PrevTint>
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

      <BuyButton>
        {post.purchasable ?
          (<i style={{ fontSize: '20px' }}
            title={'click to see purchase details'}
            className="ion-ios-cart"></i>) :
          (<i style={{ fontSize: '20px' }}
            title={'click to see purchase details'}
            className="ion-ios-cart"></i>)
        }
      </BuyButton>

      <FavButton
        onClick={handleClick}
        favorited={post.favorited ? true : false}>
        {post.favorited ?
          (<i style={{ fontSize: '20px' }}
            title={'click to unlike post'}
            className="ion-ios-heart"></i>) :
          (<i style={{ fontSize: '20px' }}
            title={'click to like post'}
            className="ion-ios-heart-outline"></i>)
        }
      </FavButton>

    </Preview>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostPreview)