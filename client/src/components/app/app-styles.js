import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  /* @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500&display=swap'); */
  /* font-family: 'Montserrat', sans-serif; */
  /* @import url('https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap'); */
  /* font-family: 'Didact Gothic', sans-serif; */
  /* @import url('https://fonts.googleapis.com/css?family=Varela+Round&display=swap'); */
  /* font-family: 'Varela Round', sans-serif; */

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* text-rendering: optimizeLegibility; */
  }

  body {
    font-size: 16;
    font-weight: 400;
    font-family: 'Montserrat';
  }
  
  #app {
    height:100%;
  }

  a,
  link,
  button {
    color: #8a8a8a;
    background: transparent;
    
    border: none;
    outline: none;
    text-decoration: none;
    
    &:hover,
    :hover {color: #080808;}

    &:focus,
    :focus {outline:0;}
  }

  ul { list-style-type: none;}

  fieldset {
    border: none;
    outline: none;
  }
  
  /* @media (max-width: 416px) {} */
  /* @media (max-width: 450px) {} */
  /* @media (max-width: 600px) {} */
  /* @media (max-width: 675px) {} */
  /* @media (min-width: 768px) {} */
  /* @media (max-width: 992px) {} */
  /* @media (max-width: 1335px) {} */
  /* @media (max-width: 1710px) {} */
  
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
    width: 10rem;
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
  
  @keyframes spin { 
    100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } 
  }
`

export default GlobalStyle;