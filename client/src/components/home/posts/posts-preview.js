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

  const options = 'c_fit,q_80,'
  const medium = `${props.post.medium}`
  const BASE = `${process.env.REACT_APP_CL_BASE}`
  const fileName = `${props.post.uploads[0].fileName}`
  const type = `${props.post.uploads[0].response.body.type}`
  const format = `${props.post.uploads[0].response.body.format}`
  const version = `v${props.post.uploads[0].response.body.version}`
  const resource_type = `${props.post.uploads[0].response.body.resource_type}`

  const sizes = `
  (min-width: 1335px) 416px, 
  (min-width: 992px) calc(calc(100vw - 72px) / 3), 
  (min-width: 768px) calc(calc(100vw - 48px) / 2), 
  100vw`

  const s01 = `${BASE}/${resource_type}/${type}/${options}w_100/${version}/${medium}/${fileName}.${format}`
  const s02 = `${BASE}/${resource_type}/${type}/${options}w_200/${version}/${medium}/${fileName}.${format}`
  const s03 = `${BASE}/${resource_type}/${type}/${options}w_300/${version}/${medium}/${fileName}.${format}`
  const s04 = `${BASE}/${resource_type}/${type}/${options}w_400/${version}/${medium}/${fileName}.${format}`
  const s05 = `${BASE}/${resource_type}/${type}/${options}w_500/${version}/${medium}/${fileName}.${format}`
  const s06 = `${BASE}/${resource_type}/${type}/${options}w_600/${version}/${medium}/${fileName}.${format}`
  const s07 = `${BASE}/${resource_type}/${type}/${options}w_700/${version}/${medium}/${fileName}.${format}`
  const s08 = `${BASE}/${resource_type}/${type}/${options}w_800/${version}/${medium}/${fileName}.${format}`
  const s09 = `${BASE}/${resource_type}/${type}/${options}w_900/${version}/${medium}/${fileName}.${format}`
  const s10 = `${BASE}/${resource_type}/${type}/${options}w_1000/${version}/${medium}/${fileName}.${format}`
  const s11 = `${BASE}/${resource_type}/${type}/${options}w_1100/${version}/${medium}/${fileName}.${format}`
  const s12 = `${BASE}/${resource_type}/${type}/${options}w_1200/${version}/${medium}/${fileName}.${format}`
  const s13 = `${BASE}/${resource_type}/${type}/${options}w_1296/${version}/${medium}/${fileName}.${format}`
  const s14 = `${BASE}/${resource_type}/${type}/${options}w_1400/${version}/${medium}/${fileName}.${format}`
  const s15 = `${BASE}/${resource_type}/${type}/${options}w_1600/${version}/${medium}/${fileName}.${format}`
  const s16 = `${BASE}/${resource_type}/${type}/${options}w_1800/${version}/${medium}/${fileName}.${format}`
  const s17 = `${BASE}/${resource_type}/${type}/${options}w_2000/${version}/${medium}/${fileName}.${format}`
  const s18 = `${BASE}/${resource_type}/${type}/${options}w_2200/${version}/${medium}/${fileName}.${format}`
  const s19 = `${BASE}/${resource_type}/${type}/${options}w_2400/${version}/${medium}/${fileName}.${format}`
  const s20 = `${BASE}/${resource_type}/${type}/${options}w_2592/${version}/${medium}/${fileName}.${format}`

  return (
    <Preview
      itemScope
      itemProp='image'
      itemType='http://schema.org/ImageObject'>

      <PrevLink
        to={`/post/${post.slug}`}
        title={`view the ${resource_type} by ${post.author.username}`}
        itemProp="contentUrl">

        <PrevTint>
          {post.uploads.map((upload, fileName) => {
            return (
              resource_type === 'video' ? null : (
                <PrevImg
                  key={fileName}
                  sizes={sizes}
                  srcSet={`
                  ${s01} 100w, ${s02} 200w, ${s03} 300w, ${s04} 400w, ${s05} 500w, 
                  ${s06} 600w, ${s07} 700w, ${s08} 800w, ${s09} 900w, ${s10} 1000w, 
                  ${s11} 1100w, ${s12} 1200w, ${s13} 1296w, ${s14} 1400w, ${s15} 1600w, 
                  ${s16} 1800w, ${s17} 2000w, ${s18} 2200w, ${s19} 2400w, ${s20} 2592w`}
                  src={s10}
                  alt={upload.fileName}
                  itemProp='previewImage' />
              )
            )
          })}
        </PrevTint>

      </PrevLink>

      {/* <PrevTitle>{post.title}</PrevTitle> */}

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

      <FavButton
        onClick={handleClick}
        favorited={post.favorited ? true : false}>
        <i className="ion-heart"></i>
      </FavButton>

    </Preview>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostPreview)