import React from 'react'
import Mediums from './mediums-list'


class MediumList extends React.Component {
  render() {
    return (
      <nav className='nav-medium-list hide-scrollbars'>
        {Mediums.map(medium => {
          return (
            <button
              href={}
              key={medium}
              className='medium-link'
              value={medium}>
              {medium}
            </button>
          )
        })}
      </nav>
    )
  }
}

export default MediumList
