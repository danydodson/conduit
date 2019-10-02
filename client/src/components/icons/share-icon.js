import styled from 'styled-components'

import { ShareApple } from 'styled-icons/evil/ShareApple'

export default styled(ShareApple)`
  display: none;
  
  @media (max-width: 768px) { 
    display: block; 
    }
`