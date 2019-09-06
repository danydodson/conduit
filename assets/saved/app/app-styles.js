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

  ul {
    list-style-type: none;
  }

  h1 {
    font-size: 2.6rem;
    font-weight: 600;
  }
  
  button {
    border: none;
    outline: none;
    background: transparent;
    
  }
  
  button:focus {
    outline:0;
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

  .photo-list {}

  .photos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .drop-zone-container {
  width: 100%;
  height: 4rem;
  background-color: #e4e4e4;
  color: #8a8a8a;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  border: 1px solid #cccccc;
  will-change: transform;
  transition: transform 0.3s;
}

.drop-zone-container.hover {
  transform: scale(0.95);
}

.drop-zone-container:hover {
  cursor: pointer;
}

.drop-zone-container input {
  display: none;
}

.drop-zone-container svg {
  fill: #8a8a8a;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
`

export default GlobalStyle;
