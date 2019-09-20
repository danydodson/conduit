import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const AuthorName = styled(Link)`
  bottom: 32px;
  left: 80px;
  opacity: 0;
  position: absolute;
  display: block;
  color:#c8c8c8;
  font-size: 15px;
  font-family: 'Varela Round', sans-serif;
  line-height: 32px;
  text-shadow: 0 1px 8px rgba(0,0,0,.1);
  transition: .2s;
  :hover {
    color: rgba(250,250,250,.9);
  }
`