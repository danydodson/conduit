import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ViewTabs = styled.ul`
  padding-top: 80px;
`

export const PrevLink = styled(Link)`
  transition: .1s;
`

export const PrevTint = styled.figure`
  margin: .8rem 0 .8rem 0;
  @media (min-width: 768px) { margin: .8rem; }
  :before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    content: "";
    margin: .8rem 0 .8rem 0;
    position: absolute;
    background: rgba(0,0,0);
    transition: .1s;
    @media (min-width: 768px) { margin: .8rem; }
  }
`

export const PrevImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  max-height: 100%;
`

export const PrevTitle = styled.span`
  bottom: 70px;
  left: 60px;
  opacity: 0;
  color: #ffffff;
  position: absolute;
  transition: .1s;
`

export const AuthLink = styled(Link)`
  transition: .1s;
`

export const AuthImg = styled.img`
  bottom: 32px;
  left: 32px;
  height: 32px;
  opacity: 0;
  position: absolute;
  border-radius: 100px;
  transition: .1s;
`

export const AuthName = styled(Link)`
  bottom: 34px;
  left: 75px;
  opacity: 0;
  color:#c8c8c8;
  font-size: 15px;
  display: block;
  text-shadow: 0 1px 8px rgba(0,0,0,.1);
  /* font-weight: 700; */
  letter-spacing: 1.2px;
  position: absolute;
  transition: .2s;
  :hover {
    color:#ffffff;
  }
`

export const FavButton = styled.button`
  right: 40px;
  bottom: 31px;
  opacity: 0;
  position: absolute;
  padding: 7px;
  font-size: 1rem;
  color: ${props => props.favorited ? 'red' : '#8a8a8a'};
  cursor: pointer;
  background-color: rgba(250,250,250,.6);
  border: 1px solid #8a8a8a;
  border-radius: 2px;
  transition: .1s;
  :hover {
    color: red;
  }
`

export const Preview = styled.article`
  width: 100vw;
  margin: auto;
  @media (min-width: 768px) { width: 50%; }
  @media (min-width: 992px) { width: 33.33333333%; }
  @media (min-width: 1335px) { width: 416px; }
  
  /* @media (min-width: 768px) { width: calc(100vw / 2) }
  @media (min-width: 992px) { width: calc(100vw / 3) }
  @media (min-width: 1335px) { width: 416px } */
  
  :hover>${PrevLink}>${PrevTint}:before { 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .666;
    content: "";
    position: absolute;
    background: rgba(0,0,0);
  }
  :hover>${PrevTitle} { opacity: 1; }
  :hover>${AuthLink}>${AuthImg} { opacity: 1; }
  :hover>${AuthName} { opacity: 1; }
  :hover>${FavButton} { opacity: 1; }
`
