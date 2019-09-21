import styled from 'styled-components'
import { Pencil } from 'styled-icons/evil/Pencil'

export default styled(Pencil)`
  display: none;
  
  @media (max-width: 768px) { 
    display: block; 
    }
`