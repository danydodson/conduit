import styled, { css } from 'styled-components'

export const MediumList = styled.nav`
  width: 100%;
  padding: 0 16px;
  padding-top: 50px;
  position: fixed;
  display: flex;
  overflow: auto;
  background-color: #fff;
  z-index: 10;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  box-shadow: 0 4px 12px rgba(0,0,0,.08), 0 0 1px rgba(1,0,0,.1);
  &::-webkit-scrollbar,
  ::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  }
`

export const MediumLinks = css`
  padding-bottom: 15px;
  font-size: 16px;
  font-family: 'Didact Gothic';
  margin: 0 1rem 0 0;  
`