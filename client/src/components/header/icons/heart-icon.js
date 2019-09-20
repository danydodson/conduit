import styled, { keyframes } from 'styled-components'
import { Heart } from 'styled-icons/evil/Heart'

const heartbeat = keyframes`
  0% {
    fill: #f76f6f
    transform: scale(1);
  }
  
  20% {
    fill: #ff3535
    transform: scale(1.2);
  }
  
  50% {
    fill: #f76f6f
    transform: scale(1);
  }
  
  100% {
    fill: #f76f6f;
    transform: scale(1);
  }
`

export default styled(Heart)`
  fill: #8a8a8a;
  transform: scale(1);
  transition: .6s ease-in-out;
  
  display: none;

  &:hover {
    fill: #f76f6f;
    animation-name: ${heartbeat};
    animation-duration: 1.1s;
    animation-timing-function: ease-in;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }

  @media (max-width: 768px) { 
    display: block; 
  }
`