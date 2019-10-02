import React from "react"
import { GoHeart } from "react-icons/go"
import styles from './styles.scss'

const LikeButton = (props) => {

  return (
    <GoHeart
      style={{ styles }}
      className={
        props.liked ? 'like' : 'unlike'
      }
      onClick={props.onClick}>
    </GoHeart>
  )
}


export default LikeButton
