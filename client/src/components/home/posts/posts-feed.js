import React, { Fragment } from 'react'
import PostPreview from './posts-preview'
import ListPagination from './posts-pagination'
import Masonry from 'react-masonry-component'

const Posts = props => {

  if (!props.posts) {
    return <div className='post-preview'>Loading...</div>

  }

  if (props.posts.length === 0) {
    return <div className='post-preview'>No posts are here... yet.</div>

  }

  return (
    <Fragment>
      <Masonry
        className={'posts-feed'}
        elementType={'ul'}
        //options={masonryOptions}
        //imagesLoadedOptions={imagesLoadedOptions}
        updateOnEachImageLoad={false}
        disableImagesLoaded={false}>
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