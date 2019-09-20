import React from 'react'
import agent from '../../../middleware/middle-agent'
import Loading from '../../loading'
import styled from 'styled-components'
import { MediumList, MediumLinks } from './mediums-styles'

const MediumLink = styled.button`
  ${MediumLinks}
`

const Mediums = props => {
  const mediums = props.mediums
  if (mediums) {
    return (
      <MediumList>
        {mediums.map(medium => {
          const handleClick = e => {
            e.preventDefault()
            props.onClickMedium(medium, page =>
              agent.Posts.byMedium(medium, page),
              agent.Posts.byMedium(medium)
            )
          }
          return (
            <MediumLink
              key={medium}
              onClick={handleClick}>
              {medium}
            </MediumLink>
          )
        })}
      </MediumList>
    )
  } else {
    return <Loading />
  }
}

export default Mediums
