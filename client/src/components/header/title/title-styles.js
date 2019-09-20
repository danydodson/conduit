import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Title = styled(Link)`
  margin: 0 1rem;
  font-family: 'Didact Gothic';

  @media (max-width: 768px) { display: none; }
`