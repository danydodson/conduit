import styled from 'styled-components'
import { Heart } from 'styled-icons/evil/Heart'

export default styled(Heart)`
  display: none;
  
  @media (max-width: 768px) { 
    display: block; 
    }
`