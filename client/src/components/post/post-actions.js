import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import agent from '../../agent'
// import fetch from 'fetch'

import {
  POST_ITEM_DELETE_POST
} from '../../actions'

// import request from 'superagent'

// const {
//   CLOUD_DESTROY,
//   CLOUD_KEY,
// } = `../../configs`

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: POST_ITEM_DELETE_POST, payload })
})

const PostActions = props => {

  const post = props.post

  // const destroy = `https://api.cloudinary.com/v1_1/seesee/image/destroy?public_id=drawing/drawing_380&timestamp=1570051541&api_key=282549924735476&signature=6f243743ab65bdfaf85e2cca443d8cae800ffacd`

  const removeFromCloud = () => {

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    }

    fetch(
      'https://api.cloudinary.com/v1_1/seesee/image/destroy?public_id=' + post.uploads[0].public_id + '&timestamp=' + post.uploads[0].version + '&api_key=282549924735476&signature=' + post.signature, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  // const removePost = () => {

  //   props.onClickDelete(agent.Posts.del(post.slug))
  // }

  if (props.canModify) {
    return (
      <span>
        <Link to={`/editor/${post.slug}`}>
          {'Edit Post'}
        </Link>
        <button onClick={removeFromCloud}>
          {'Delete Post'}
        </button>
      </span>
    )
  }
  return (
    <span>
    </span>
  )
}

export default connect(() => ({}), mapDispatchToProps)(PostActions)
