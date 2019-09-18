import React from 'react'
import agent from '../../../middleware/middle-agent'
import Loading from '../../loading'

const Mediums = props => {
  const mediums = props.mediums

  if (mediums) {
    return (
      <nav className='nav-medium-list hide-scrollbars'>
        {mediums.map(medium => {
          const handleClick = e => {
            e.preventDefault()
            props.onClickTag(medium, page =>
              agent.Posts.byMedium(medium, page),
              agent.Posts.byMedium(medium)
            )
          }
          return (
            <button
              onClick={handleClick}
              className='medium-link'
              href=''
              key={medium}>
              {medium}
            </button>
          )
        })}
      </nav>
    )
  } else {
    return <Loading />
  }
}

export default Mediums
