import React, { Fragment } from 'react'
import PostPreview from './posts-preview'
import ListPagination from './posts-pagination'
import Masonry from 'react-masonry-component'
import styled from 'styled-components'

const masonryOptions = {
  transitionDuration: 0
}

const Posts = props => {

  if (!props.posts) {
    return <article className='pp'>Loading...</article>
  }

  if (props.posts.length === 0) {
    return <article className='pp'>No posts... yet.</article>
  }

  const masonry = ({ className }) => (
    <Masonry
      className={className}
      options={masonryOptions}>
      {
        props.posts.map(post => {
          return (
            <PostPreview key={post.slug} post={post} />
          )
        })
      }
    </Masonry>
  )

  const PostsFeed = styled(masonry).attrs({ className: "pf" })`
    &.pf {
      width: 100vw;
      margin-left: auto;
      margin-right: auto;
      @media (min-width: 768px) { 
        width: 98%;
      }
      
      @media (min-width: 992px) { 
        max-width: 1334px; 
        padding-left: 12px;
        padding-right: 12px;
      }
    }
  `

  return (
    <Fragment>
      <PostsFeed />
      <ListPagination
        pager={props.pager}
        postsCount={props.postsCount}
        currentPage={props.currentPage} />
    </Fragment>
  )
}

export default Posts