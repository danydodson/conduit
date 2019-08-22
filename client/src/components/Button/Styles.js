import { css } from 'styled-components'

const buttonStyles = css`
  cursor: pointer;
  color: #818a91;
  font-size: 16px;
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

export default buttonStyles
