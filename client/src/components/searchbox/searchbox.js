import React, { Component } from 'react'
import { Search } from './searchbox-styles'

class Searchbox extends Component {
  render() {
    return (
      <Search
        type='text'
        className='nav-search'
      />
    )
  }
}

export default Searchbox