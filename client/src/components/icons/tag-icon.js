import styled from 'styled-components'

import { Tag } from 'styled-icons/evil/Tag'

export default styled(Tag)`
  display: none;
  
  @media (max-width: 768px) { 
    display: block; 
    }
`