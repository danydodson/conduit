import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  
  :root { 
    --nav-timem-color: brown;
  }

  *,
  *::before, 
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  }

  html {
    height: 100%;
    font-size: 62.5%;
  
    @include respond(phone) {
      /* font-size: 56.25%; */
      font-size: 50.25%;
    }
    
    @include respond(tab-land) {
      font-size: 56.25%;
    }
    
    @include respond(tab-port) {
      font-size: 50%;
    }
    
    @include respond(big-desktop) {
      font-size: 75%;
    }
  }
  
  body {
    letter-spacing: 0.01rem;
    font-family: 'Montserrat', sans-serif;
  }
  
  #app {
    height:100%;
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

  @media (max-width: 416px) {} /** */
  @media (max-width: 450px) {}
  @media (max-width: 600px) {}
  @media (max-width: 675px) {} 
  @media (min-width: 768px) {} /** */
  @media (max-width: 992px) {}
  @media (max-width: 1335px) {} /** */
  @media (max-width: 1710px) {}
  
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
  
`

export default GlobalStyle;