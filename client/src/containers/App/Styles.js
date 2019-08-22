import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
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
    max-width: 500px;
    padding: 15px;
    border-radius: 5px;
    text-align: center;
  }

  #modal .buttons button {
    display: inline-block;
    margin-right: 15px;
  }
`;

export default GlobalStyle;
