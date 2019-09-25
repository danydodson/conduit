import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  display: block;
  z-index: 1000;
`

export const BackIcon = styled.button`
  top: 1rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;
  margin: 1rem;
  color: rgba(0, 0, 0, .9);
  font-size: 1.4rem;
  border-radius: 4px;
  position: absolute;
  background-color: rgba(250, 250, 250, .5);
  &:hover {
    color: rgb(240, 61, 61);
    background-color: rgba(250, 250, 250, .9);
  }
`

export const Content = styled.div`
  top: 10px;
  left: 70px;
  right: 70px;
  bottom: 10px;
  overflow: auto;
  position: fixed;
  border: 1px solid #2c2c2c;
  background-color: #ffffff;
  outline: none;
  display: block;
`
