import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MdHeart from 'react-ionicons/lib/MdHeart'

// header styles ---------------------------------

export const Head = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  position: fixed;
  align-items: center;
  background-color: #ffffff;
  justify-content: space-between;
  z-index: 20;
`

// ul list styles ---------------------------------

export const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content:space-between;

  @media (max-width: 768px) { 
    width: 100vw;
    justify-content: space-around;
  }
`
// li item styles ---------------------------------

export const Item = styled.li`
  margin: 0 1rem;
  @media (max-width: 768px) {display: none;}
`

// Link styles ------------------------------------

export const LnkTo = styled(Link)`
  display: flex;
  font-family: 'Didact Gothic';
  align-items: center;
`

// Icon Link styles -------------------------------

export const IcoLnk = styled(Link)`
  color: #8a8a8a; 
  transition: .1s; 
  
  &:hover { 
    color: #080808
  }
`

// vertical ruller styles -------------------------

export const Ruller = styled.div`
  background-color: #d1d1d1;
  margin: 1px 22px 0px 22px;
  width: 1px;
  height: 30px;

  @media (max-width: 768px) { 
    display: none; 
  }
`

// li image styles --------------------------------

export const Image = styled.img`
  opacity: 1;
  height: 30px;
  transition: .1s;
  border-radius: 100px;

  &:hover { 
    opacity: 0.8;
  }
`

// li image styles --------------------------------

export const IcoImg = styled.li`
   margin: 0 1rem;
`



export const Hea = styled(MdHeart)`
  fill: gray;
  :hover{
    fill:${props => props.beat ? '#f76f6f' : '#000'};
  }
`