import styled from 'styled-components'
import { Archive } from 'styled-icons/evil/Archive'

export default styled(Archive)`
  display: none;
  
  @media (max-width: 768px) { 
    display: block; 
    }
`