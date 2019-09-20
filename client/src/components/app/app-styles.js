import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  
  *,
  *::before, 
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  }

  html,
  body {}

  body {
    font-family: 'Source Sans Pro';
  }
  
  a,
  link,
  button {
    border: none;
    outline: none;
    color: #8a8a8a;
    cursor: pointer;
    text-decoration: none;
    background: transparent;
    transition: .1s;
    :hover {
      color: #080808;
    }
  }

  button:focus {
    outline:0;
  }

  ul {
    list-style-type: none;
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 600;
  }
  
  /** Posts Feed ----------------------------------------------------*/
  
    div.posts-feed {
    width: 100%;
    margin: auto;
    @media (min-width: 768px) { width: 97%; }
    @media (min-width: 992px) { max-width: 1320px; }
  }

  /** React Icons ----------------------------------------------------*/

  .react-nav-icons {
    vertical-align: middle;
    color: #8a8a8a;
    font-size: 20px;
    cursor: pointer;
    
    &:hover {
      color: #080808;
    }
  }

  .react-icon-gear {
    vertical-align: middle;
    color: #8a8a8a;
    font-size: 20px;
    padding: 3px 0 1px 0;
    &:hover {
      color: #080808;
    }
  }
  
  /** Editor Form Page -------------------------------------------------*/
  
  .editor-form {
    padding-top: 60px;
  }
  
  .dropzone {
    width: 100%;
    height: 30rem;
    display: flex;
    color: #8a8a8a;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background-color: #eee;
    will-change: transform;
    border: 1px solid #eee;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    transition: transform 0.3s;
    &:hover {
      cursor: default;
    }
  }
  
  .dropzone.hover {
    transform: scale(0.95);
  }
  
  .dropzone input {
    display: none;
  }
  
  .dropzone svg {
    fill: #8a8a8a;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }
  
  .preview {
    width: 10rem
  }
  
  .preview:hover{
    opacity: .5;
  }
  
  .progress-bar {
    height: 1rem;
    background-color: orangered;
  }
  
  .response_wrap {
    display: flex;
    flex-wrap: wrap;
  }
  
  .photos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  
  /** Animations ----------------------------------------------*/

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

`

export default GlobalStyle;