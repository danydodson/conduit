import React from 'react'
import { connect } from 'react-redux'
import agent from '../../../middleware/middle-agent'

import {
  POST_ITEM_ADD_COMMENT
} from '../../../constants'

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: POST_ITEM_ADD_COMMENT, payload })
})

class CommentInput extends React.Component {
  constructor() {
    super()
    this.state = { body: '' }

    this.setBody = ev => {
      this.setState({ body: ev.target.value })
    }

    this.createComment = ev => {
      ev.preventDefault()

      const payload = agent.Comments.create(
        this.props.slug, { body: this.state.body }
      )

      this.setState({ body: '' })
      this.props.onSubmit(payload)
    }
  }

  render() {
    return (
      <form
        onSubmit={this.createComment}>

        <textarea
          placeholder="Write a comment..."
          value={this.state.body}
          onChange={this.setBody}
          rows="3">
        </textarea>


        <img
          src={this.props.currentUser.image}
          alt={this.props.currentUser.username} />

        <button
          type="submit">
          {'Post Comment'}
        </button>

      </form>
    )
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput)
