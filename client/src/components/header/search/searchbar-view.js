import React, { Component } from 'react'
import { Input, SearchForm, Magnifier } from './searchbar-styles'

class Search extends Component {

  state = { term: '', posts: [] }

  onFormSubmit(ev) {
    ev.preventDefaults()
    this.props.onSearchSubmit(this.state.term)
  }

  render() {
    return (
      <SearchForm onSubmit={this.onFormSubmit}>
        <Input
          type='text'
          value={this.state.term}
          placeholder='What are you looking for ?'
          onChange={ev => this.setState({ term: ev.target.value })} />
        <Magnifier size='30px' />
      </SearchForm>
    )
  }
}

export default Search