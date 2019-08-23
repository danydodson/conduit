import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
  cursor: pointer;
  color: #818a91;
  text-decoration: none;
  font-family: 'Titillium Web';

  &:hover {
    color: #4e4e4e;
    text-decoration: none;
  }
  
  &:focus {
    color: #4e4e4e;
    text-decoration: none;
  }
  
  &:active {
    color: #4e4e4e;
  }
`