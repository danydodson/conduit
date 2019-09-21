import styled from 'styled-components'
import { Gear } from 'styled-icons/evil/Gear'

export default styled(Gear)`
  display: none;
  
  @media (max-width: 768px) { 
    display: block; 
    }
`