import React, { Component, Fragment } from 'react'
import { SearchBox, Magnifier } from './searchbox-styles'

class Search extends Component {
  render() {
    return (
      <Fragment>
        <SearchBox
          type='text'
          placeholder='What are you looking for ?' />
        <Magnifier
          size='26px' />
      </Fragment>
    )
  }
}

export default Search