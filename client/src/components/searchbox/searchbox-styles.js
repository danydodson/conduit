import styled from 'styled-components'
import { Search } from 'styled-icons/evil/Search'

export const Magnifier = styled(Search)`
  opacity: 1;
  left: 105px;
  color: #8a8a8a;
  position: absolute;
  transition: .3s .4s ease-in; /* On Focus Removed */

  @media (max-width: 768px) { 
    display: none;
  }
`

export const SearchBox = styled.input`
  flex: 1;
  height: 25px;
  outline: none;
  color: #1bc8ff;
  margin: 0 1rem;
  border-radius: 100px;
  background-color: #f5f5f5;
  padding: 18px 18px 18px 48px;
  border: 1px solid rgba(138, 138, 138,.1);
  transition:  /* On Focus Removed */
    border .2s .1s ease-in,
    padding .5s .3s cubic-bezier(.33,.06,.4,1.84),
    /* padding .2s .2s ease-in, */
    background-color .2s .1s ease-in;
  
  @media (max-width: 768px) { 
    display: none; 
  }

  &::-webkit-input-placeholder {
    color: #8a8a8a;
    position: absolute;
    font-family: 'Didact Gothic', sans-serif;
    transition: .2s .1s ease-in; /* On Focus Removed */
  }

  &:focus {
    background-color: #fff;
    padding: 18px 18px 18px 20px;
    border: 1px solid rgba(138, 138, 138,.2); 
    transition:  /* On Focus */
      border .1s .1s ease-in,
      padding .5s .3s  cubic-bezier(.33,.06,.4,1.84), 
      background-color .1s .1s ease-in; 
  }

  &:focus + ${Magnifier} {
    opacity: 0;
    transition: .1s .1s ease-in; /* On Focus */
  }

  &:focus::-webkit-input-placeholder {
    color: #1bc8ff;
    transition: .1s; /* On Focus */
  }
`
