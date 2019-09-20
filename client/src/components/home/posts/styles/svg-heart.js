import styled from 'styled-components'
import { GoHeart } from "react-icons/go";

export const Heart = styled(GoHeart)`
  top: 32px;
  right: 32px;

  font-size:35px;
  padding: 2px 7.88px 1px 7.88px;
  
  border-radius: 2px;
  box-shadow: 0 1px 8px rgba(0,0,0,.1);
  background-color: rgba(250,250,250,.7);
  
  color: ${props => (
    props.favorited ? '#f15151' : '#8a8a8a')
  };
  
  opacity: 0;
  cursor: pointer;
  position: absolute;
  transition: .2s ease-in-out;

  &:hover {
    color: #f76f6f;
    background-color: rgba(250,250,250,.9);
  }
`