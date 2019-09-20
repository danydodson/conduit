import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Heart } from './styles/svg-heart'
import { Cash } from './styles/svg-cash'

export const ViewTabs = styled.ul`
  display: flex;
  padding-top: 120px;
  padding-left: 16px;
`
// --------------------------------------- 

export const ViewTabItem = styled.li`
  padding-right: 16px;
`
// ---------------------------------------

export const PrevLink = styled(Link)`
  transition: .1s;
`
// ---------------------------------------

export const PrevTint = styled.figure`
  margin: .8rem 0 .8rem 0;

  @media (min-width: 768px) { 
    margin: .8rem; 
  }
  
  :before {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    content: "";
    position: absolute;
    margin: .8rem 0 .8rem 0;
    background: rgba(0,0,0,0);
    transition: .3s;

    @media (min-width: 768px) {
       margin: .8rem; 
    }
  }
`

// ---------------------------------------

export const PrevImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  max-height: 100%;
`

// ---------------------------------------

export const AuthLink = styled(Link)`
  transition: .1s;
`

// ---------------------------------------

export const AuthImg = styled.img`
  bottom: 32px;
  left: 32px;
  height: 32px;
  opacity: 0;
  position: absolute;
  border-radius: 100px;
  transition: .1s;
`

// ---------------------------------------

export const AuthName = styled(Link)`
  bottom: 32px;
  left: 80px;
  opacity: 0;
  position: absolute;
  display: block;
  color:#c8c8c8;
  font-size: 15px;
  font-family: 'Varela Round', sans-serif;
  line-height: 32px;
  text-shadow: 0 1px 8px rgba(0,0,0,.1);
  transition: .2s;
  :hover {
    color: rgba(250,250,250,.9);
  }
`

// ---------------------------------------

export const BuyButton = styled.button`
  right: 87px;
  top: 32px;
  /* bottom: 32px; */
  opacity: 0;
  position: absolute;
  padding: 5px 10.88px 4px 10.88px;
  color: #8a8a8a;
  background-color: rgba(250,250,250,.7);
  border-radius: 2px;
  box-shadow: 0 1px 8px rgba(0,0,0,.1);
  cursor: pointer;
  transition: .2s ease-in-out;
  :hover {
    color: #1ab143;
    background-color: rgba(250,250,250,.9);
  }
`

// ---------------------------------------

export const Preview = styled.article`
  width: 100vw;
  margin: auto;
  @media (min-width: 768px) { width: 50%; }
  @media (min-width: 992px) { width: 33.33333333%; }
  @media (min-width: 1335px) { width: 416px; }
  /* @media (min-width: 768px) { width: calc(100vw / 2) } */
  /* @media (min-width: 992px) { width: calc(100vw / 3) } */
  /* @media (min-width: 1335px) { width: 416px } */
  :hover>${AuthLink}>${AuthImg} { opacity: .8; }
  :hover>${AuthName} { opacity: 1; }

  :hover>${Heart} { opacity: 1; }
  :hover>${Cash} { opacity: 1; }
  
  :hover>${BuyButton} { opacity: 1; }
  :hover>${PrevLink}>${PrevTint}:before { 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    position: absolute;
    background: rgba(0,0,0,0.2);
    background-image: linear-gradient(180deg, rgba(0,0,0,.2) 0, rgba(0,0,0,.199) 3.5%, rgba(0,0,0,.195) 7%, rgba(0,0,0,.19) 10.35%, rgba(0,0,0,.182) 13.85%, rgba(0,0,0,.174) 17.35%, rgba(0,0,0,.165) 20.85%, rgba(0,0,0,.155) 24.35%, rgba(0,0,0,.145) 27.85%, rgba(0,0,0,.135) 31.35%, rgba(0,0,0,.126) 34.85%, rgba(0,0,0,.118) 38.35%, rgba(0,0,0,.11) 41.85%, rgba(0,0,0,.105) 45.35%, rgba(0,0,0,.1) 48.85%, rgba(0,0,0,.103) 52.35%, rgba(0,0,0,.112) 55.85%, rgba(0,0,0,.126) 59.35%, rgba(0,0,0,.144) 62.85%, rgba(0,0,0,.165) 66.35%, rgba(0,0,0,.188) 69.85%, rgba(0,0,0,.213) 73.35%, rgba(0,0,0,.237) 76.85%, rgba(0,0,0,.262) 80.35%, rgba(0,0,0,.285) 83.85%, rgba(0,0,0,.306) 87.35%, rgba(0,0,0,.324) 90.85%, rgba(0,0,0,.338) 94.35%, rgba(0,0,0,.347) 97.85%, rgba(0,0,0,.35));
  }
`
