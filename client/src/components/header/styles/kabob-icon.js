import styled from 'styled-components'
import { KebabHorizontal } from 'styled-icons/octicons/KebabHorizontal'

export default styled(KebabHorizontal)`
  color: #8a8a8a;
  cursor: pointer;
  transition: .2s ease-in-out;

  &:hover { 
    color: #080808
  }
  
  @media (max-width: 768px) { 
    display: none;
  }
`