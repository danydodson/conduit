import styled from 'styled-components'
import { Search } from 'styled-icons/evil/Search'

export const Magnifier = styled(Search)`
  opacity: 1;
  left: 105px;
  margin-top: 4px;
  color: #8a8a8a;
  position: absolute;
  transition: .3s .4s ease-in; /* On Focus Removed */

  @media (max-width: 768px) { display: none;}
`

/* ------------------------------------------------------- */

export const SearchForm = styled.form`
  flex: 1;
`

export const Input = styled.input`
  width: 90%;
  height: 25px;
  margin: 0 1rem;
  padding: 18px 18px 18px 48px;
  
  outline: none;
  border-radius: 100px;
  background-color: #f5f5f5;
  border: 2px solid rgba(138, 138, 138,.1);
  
  color: #00c4ff;
  font-size: 15px;

  transition:  /* On Focus Removed */
    border .2s .1s ease-in,
    padding .4s .1s ease-in-out,
    background-color .2s .1s ease-in;

  @media (max-width: 768px) {display: none;}

  /* ------------------------------------------------------- */

  &:focus {
    background-color: #fff;
    padding: 18px 18px 18px 25px;
    border: 2px solid rgba(138, 138, 138,.3);
    transition:  /* On Focus */
      border .1s .1s ease-in,
      padding .4s .2s  ease-in-out, 
      background-color .1s .1s ease-in; 
  }

  /* ------------------------------------------------------- */
  
  &:focus + ${Magnifier} {
    opacity: 0;
    transition: .1s 0s ease-in; /* On Focus */
  }

  /* ------------------------------------------------------- */

  &::-webkit-input-placeholder {
    position: absolute;
    
    color: #8a8a8a;
    font-family: 'Didact Gothic', sans-serif;
    
    transition: .2s .1s ease-in; /* On Focus Removed */
  }

  /* ------------------------------------------------------- */

  &:focus::-webkit-input-placeholder {
    color: #00c4ff;

    transition: .1s; /* On Focus */
  }
`
