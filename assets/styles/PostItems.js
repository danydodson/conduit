import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Like from '../../components/buttons/Like'
import Owner from '../../components/buttons/Owner'
import Title from '../../components/buttons/Title'
import Cover from '../../components/buttons/Cover'
import styled from 'styled-components'

const CardItem = styled.li`
  margin: 15px;
  position: relative;
  max-height: 300px;
  max-width: 270px;

  :hover>button.like,
  :hover>a.author,
  :hover>a.title,
  :hover>.cover{
    opacity: 1;
    position: absolute;
  }

  :hover>button.like {
    top: 5%;
    left: 5%;
  }
  
  :hover>Link.title{
    top: 82%;
    left: 5%;
  }
  
  :hover>Link.author{
    top: 82%;
    left: 50%;
  }
  
  :hover>.cover{
    top: 0;
    left: 0;
  }
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  background-size: cover;
`

class PostItems extends Component {

  render() {

    const { post, match } = this.props

    return (

      <CardItem>

        <Cover
          to={{
            state: { showModal: true },
            pathname: `${match.path}/${post._id}`
          }}
        />

        <Like />

        <Title
          to={{ pathname: `/profile/${post.handle}`, }}
          text={post.title}
        />

        <Owner
          to={{ pathname: `/category/${post.category}/`, }}
          text={post.category}
        />

        <CardImage src={`/posts/${post.src}`} alt='i' />

      </CardItem>

    )
  }
}

export default withRouter(PostItems)
