import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, 
  *::before, 
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  button {
    border: none;
    outline: none;
    background: transparent;
  }

  .hide-scrollbars {
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
  
    &::-webkit-scrollbar,
    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
  }
  
  #app {
    min-height: 100%;
    min-width: 100%;
  }

  #modal {
    background-color: rgba(0, 0, 0, 0.9);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #modal:empty {
    display: none;
  }

  #modal > div {
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    text-align: center;
  }

  #modal .buttons button {
    display: inline-block;
    margin-right: 15px;
  }
`

export default GlobalStyle;
