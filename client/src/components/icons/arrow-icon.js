import styled from 'styled-components'

import { ArrowRight } from 'styled-icons/octicons/ArrowRight'

export default styled(ArrowRight)`
  cursor: pointer;
  color: #8a8a8a;
  transition: .2s ease-in-out;
  font-weight: ${props => (props.important ? 'bold' : 'normal')};

  &:hover {
    color: #080808;
  }
  
  @media (max-width: 768px) { 
    display: none;
  }

`