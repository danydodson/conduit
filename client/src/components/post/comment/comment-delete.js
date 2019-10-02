import React from 'react'
import { connect } from 'react-redux'
import agent from '../../../agent'

import {
  POST_ITEM_DELETE_COMMENT
} from '../../../actions'

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) =>
    dispatch({ type: POST_ITEM_DELETE_COMMENT, payload, commentId })
})

const DeleteButton = props => {
  const del = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId)
    props.onClick(payload, props.commentId)
  }

  if (props.show) {
    return (
      <span>
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    )
  }
  return null
}

export default connect(() => ({}), mapDispatchToProps)(DeleteButton)
