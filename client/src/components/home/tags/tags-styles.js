import styled, { css } from 'styled-components'

export const TagList = styled.nav`
  width: 100%;
  position: fixed;
  display: flex;
  overflow: auto;
  padding-top: 60px;
  background-color: #fff;
  z-index: 10;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  &::-webkit-scrollbar,
  ::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  }
`

export const TagLinks = css`
  font-size: 16px;
  margin: 0 1rem 0 0;  
`