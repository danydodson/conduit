import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const Head = styled.header`
  height: 60px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 20;
  align-items: center;
  background-color: #ffffff;
  justify-content: space-between;
`

export const NavList = styled.ul`
  display: flex;
  align-items: center;
`

export const Search = styled.input`
  flex: 1;
  margin: 0 1rem;
  padding: 20px;
  height: 25px;
  border: none;
  outline: none;
  border-radius: 100px;
  background-color: #f5f5f5;
`

export const NavItem = styled.li`
  margin: 0 1rem;
`

export const NavLink = styled(Link)`
  display: flex;
  /* margin: 0 1rem; */
  align-items: center;
`

export const UserImg = styled.img`
  height: 30px;
  border-radius: 100px;
`