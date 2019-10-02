import React from 'react'
// import agent from '../../../middleware/middle-agent'
import agent from '../../../agent'
import Loading from '../../loading'
import styled from 'styled-components'
import { TagList, TagLinks } from './tags-styles'

const TagLink = styled.button`
  ${TagLinks}
`

const Tags = props => {
  const tags = props.tags

  if (tags) {
    return (
      <TagList>
        {tags.map(tag => {
          const handleClick = e => {
            e.preventDefault()
            props.onClickTag(tag, page =>
              agent.Posts.byTag(tag, page),
              agent.Posts.byTag(tag)
            )
          }
          return (
            <TagLink
              key={tag}
              onClick={handleClick}>
              {tag}
            </TagLink>
          )
        })}
      </TagList>
    )
  } else {
    return <Loading />
  }
}

export default Tags
