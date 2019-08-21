import styled from 'styled-components'

const NavList = styled.ul`
  margin: 0;
  width: 100%;
  display: flex;
  list-style: none;

  &:not(first-child){
    float: right;
  }
`

export default NavList
