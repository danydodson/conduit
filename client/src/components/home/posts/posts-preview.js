import React from 'react'
import agent from '../../../middleware/middle-agent'
import { connect } from 'react-redux'

import {
  Preview,
  PrevLink,
  PrevTint,
  PrevImg,
  // PrevTitle,
  AuthLink,
  AuthImg,
  AuthName,
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

  // const sizes = '(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw'
  // const sizes = '(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw'

  // const src = `https://res.cloudinary.com/seesee/q_80,w_1000/v${props.post.uploads[0].response.body.version}/${props.post.medium}/${props.post.uploads[0].fileName}`

  const s1 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_100/v${props.post.uploads[0].response.body.version}/${props.post.medium}/${props.post.uploads[0].fileName}`
  const s2 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_200/v${props.post.uploads[0].response.body.version}/${props.post.uploads[0].response.body.public_id}`
  const s3 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_300/v${props.post.uploads[0].response.body.version}/${props.post.uploads[0].response.body.public_id}`
  const s4 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_400/v${props.post.uploads[0].response.body.version}/${props.post.uploads[0].response.body.public_id}`
  const s5 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_500/v${props.post.uploads[0].response.body.version}/${props.post.uploads[0].response.body.public_id}`
  const s6 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_600/v${props.post.uploads[0].response.body.version}/${props.post.uploads[0].response.body.public_id}`
  const s7 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_700/v${props.post.uploads[0].response.body.version}/${props.post.uploads[0].response.body.public_id}`
  const s8 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_800/v${props.post.uploads[0].response.body.version}/${props.post.uploads[0].response.body.public_id}`
  const s9 = `https://res.cloudinary.com/seesee/image/upload/c_fit,q_80,w_900/v${props.post.uploads[0].response.body.version}/${props.post.uploads[0].response.body.public_id}`
  const s10 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_1000/${props.post.uploads[0].response.body.public_id}`
  const s11 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_1100/${props.post.uploads[0].response.body.public_id}`
  const s12 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_1200/${props.post.uploads[0].response.body.public_id}`
  const s13 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_1296/${props.post.uploads[0].response.body.public_id}`
  const s14 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_1400/${props.post.uploads[0].response.body.public_id}`
  const s15 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_1600/${props.post.uploads[0].response.body.public_id}`
  const s16 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_1800/${props.post.uploads[0].response.body.public_id}`
  const s17 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_2000/${props.post.uploads[0].response.body.public_id}`
  const s18 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_2200/${props.post.uploads[0].response.body.public_id}`
  const s19 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_2400/${props.post.uploads[0].response.body.public_id}`
  // const s20 = `https://res.cloudinary.com/seesee/c_fit,q_80,w_2592/${props.post.uploads[0].response.body.public_id}.webp`

  return (
    <Preview
      itemScope
      itemProp='image'
      itemType='http://schema.org/ImageObject'
    >

      <PrevLink
        to={`/post/${post.slug}`}
        title={`View the photo by ${post.author_name}`}
        itemProp="contentUrl"
      >
        <PrevTint>
          {post.uploads.map((upload, fileName) => {
            return (
              <PrevImg
                key={fileName}
                // src={`${src}`}
                // src={upload.response.body.secure_url}
                sizes='(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw'
                srcSet={`
                ${s1} 100w,
                ${s2} 200w, 
                ${s3} 300w,
                ${s4} 400w,
                ${s5} 500w,
                ${s6} 600w,
                ${s7} 700w,
                ${s8} 800w,
                ${s9} 900w,
                ${s10} 1000w,
                ${s11} 1100w,
                ${s12} 1200w,
                ${s13} 1296w,
                ${s14} 1400w,
                ${s15} 1600w,
                ${s16} 1800w,
                ${s17} 2000w, 
                ${s18} 2200w,
                ${s19} 2400w`}
                alt={upload.fileName}
                itemProp="thumbnailUrl"
              />
            )
          })}
        </PrevTint>
      </PrevLink>

      {/* <PrevTitle>{post.title}</PrevTitle> */}

      <AuthLink to={`/@${post.author.username}`}>
        <AuthImg
          src={post.author.image}
          className='pp-author-img'
          alt={post.author.username} />
      </AuthLink>

      <AuthName to={`/@${post.author.username}`}>
        {post.author.username}
      </AuthName>

      <FavButton onClick={handleClick}>
        <i className="ion-heart"></i>
        {/* {' '}{post.favoritesCount} */}
      </FavButton>

    </Preview>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostPreview)