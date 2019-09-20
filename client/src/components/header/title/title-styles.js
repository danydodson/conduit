import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Title = styled(Link)`
  margin: 0 1rem;
  @media (max-width: 768px) { display: none; }
`