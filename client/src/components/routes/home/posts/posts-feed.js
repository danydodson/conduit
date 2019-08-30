import PostPreview from './posts-preview'
import ListPagination from './posts-pagination'
import React from 'react'

const Posts = props => {

  if (!props.posts) {
    return (
      <div className="article-preview">Loading...</div>
    )
  }

  if (props.posts.length === 0) {
    return (
      <div className="article-preview">
        No posts are here... yet.
      </div>
    )
  }

  return (
    <div>
      {
        props.posts.map(post => {
          return (
            <PostPreview
              key={post.slug}
              post={post} />
          )
        })
      }
      <ListPagination
        pager={props.pager}
        postsCount={props.postsCount}
        currentPage={props.currentPage} />
    </div>
  )
}

export default Posts