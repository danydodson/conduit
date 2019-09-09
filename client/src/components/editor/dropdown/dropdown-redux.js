import React from 'react'
import DropdownView from './dropdown-view'

class Dropdown extends React.Component {
  constructor() {
    super()
    this.state = {
      medium: [
        { id: 0, title: 'Architecture', selected: false, key: 'medium' },
        { id: 1, title: 'Carpentry', selected: false, key: 'medium' },
        { id: 2, title: 'Ceramics', selected: false, key: 'medium' },
        { id: 3, title: 'Collage', selected: false, key: 'medium' },
        { id: 4, title: 'Conceptual', selected: false, key: 'medium' },
        { id: 5, title: 'Decorative', selected: false, key: 'medium' },
        { id: 6, title: 'Drawing', selected: false, key: 'medium' },
        { id: 7, title: 'Electronic', selected: false, key: 'medium' },
        { id: 8, title: 'Film', selected: false, key: 'medium' },
        { id: 9, title: 'Food', selected: false, key: 'medium' },
        { id: 10, title: 'Glass', selected: false, key: 'medium' },
        { id: 11, title: 'Graphics', selected: false, key: 'medium' },
        { id: 12, title: 'Installation', selected: false, key: 'medium' },
        { id: 13, title: 'Light', selected: false, key: 'medium' },
        { id: 14, title: 'Literature', selected: false, key: 'medium' },
        { id: 15, title: 'Multimedia', selected: false, key: 'medium' },
        { id: 16, title: 'Natural', selected: false, key: 'medium' },
        { id: 17, title: 'Painting', selected: false, key: 'medium' },
        { id: 18, title: 'Performance', selected: false, key: 'medium' },
        { id: 19, title: 'Photography', selected: false, key: 'medium' },
        { id: 20, title: 'Printmaking', selected: false, key: 'medium' },
        { id: 21, title: 'Sculpture', selected: false, key: 'medium' },
        { id: 22, title: 'Sound', selected: false, key: 'medium' },
        { id: 23, title: 'Technical', selected: false, key: 'medium' },
      ]
    }
  }

  render() {
    return (
      <DropdownView
        title='Select Medium'
        list={this.state.medium} />
    )
  }
}

export default Dropdown