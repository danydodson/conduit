import React, { Fragment } from 'react'
import PostPreview from './posts-preview'
import ListPagination from './posts-pagination'
import Masonry from 'react-masonry-component'

const masonryOptions = {
  transitionDuration: 600,
}

const Posts = props => {

  if (!props.posts) {
    return <article className='pp'>Loading...</article>
  }

  if (props.posts.length === 0) {
    return <article className='pp'>No posts are here... yet.</article>
  }

  return (
    <Fragment>
      <Masonry
        options={masonryOptions}
        className={'posts-feed'}
        elementType={'section'}>
        {props.posts.map(post => {
          return <PostPreview key={post.slug} post={post} />
        })}
      </Masonry>
      <ListPagination
        pager={props.pager}
        postsCount={props.postsCount}
        currentPage={props.currentPage} />
    </Fragment>
  )
}

export default Posts