import React from 'react'
import agent from '../../../agent'
import Loading from '../../../components/loading'

const Tags = props => {

  const tags = props.tags

  if (tags) {
    return (
      <div className="tag-list">
        {tags.map(tag => {
          const handleClick = ev => {
            ev.preventDefault()
            props.onClickTag(tag, page =>
              agent.Posts.byTag(tag, page),
              agent.Posts.byTag(tag)
            )
          }
          return (
            <button
              href=""
              className="tag-default tag-pill"
              key={tag}
              onClick={handleClick}>
              {tag}
            </button>
          )
        })}
      </div>
    )
  } else {
    return <Loading />
  }
}

export default Tags
