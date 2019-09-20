import styled from 'styled-components'
import { Search } from 'styled-icons/evil/Search'

export default styled(Search)`
  display: none;
  
  @media (max-width: 768px) { 
    display: block; 
    }
`