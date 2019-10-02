import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, 
  *::before, 
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  html,
  body {
    /* height: 100%; */
    /* width: 100%; */
  }

  body {
    box-sizing: border-box;
    font-family: 'Source Sans Pro';
    /* font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; */
  }

  ul {
    list-style-type: none;
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 600;
  }
  
  a,
  link,
  button {
    border: none;
    outline: none;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
  }
  
  a {
    /* color: #ccc; */
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
  
  img.user-img {
      height: 30px;
      border-radius: 100px;
  }

  /** Header ------------------------------------------------*/
 
  header {
    
    nav {
      height: 60px;
      width: 100%;
      display: flex;
      position: fixed;
      z-index: 100;
      align-items: center;
      background-color: #ffffff;
      justify-content: space-between;
    }

    .nav-list {
      display: flex;
      align-items: center;
    }
    
    input.nav-search {
      flex: 1;
      margin: 0 1rem;
      padding: 20px;
      height: 25px;
      border: none;
      outline: none;
      border-radius: 100px;
      background-color: #f5f5f5;
    }

    .nav-item {
      margin: 0 1rem;
    }
    
    .nav-link {
      display: flex;
      /* margin: 0 1rem; */
      align-items: center;
    }

  }

  .banner {
    padding-top: 60px;
  }

  /** Posts ------------------------------------------------*/
  
  ul.posts-feed {}
  
  li.post-preview {
    width: 30%;
    margin: 1rem;

    :hover>a.post-preview-link>figure.post-preview-tint:before { 
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: .6;
      content: "";
      position: absolute;
      background: rgba(0,0,0);
    }
    
    :hover>a.post-author-img-link>img.post-author-img { opacity: 1; }
    
    :hover>a.post-author-username {  opacity: 1; }
    
    :hover>button.post-btn-faved { opacity: 1; }
  }
  
  a.post-preview-link {
    transition: .1s 
  }

  figure.post-preview-tint {
    opacity: 1;
    position: relative;
    background: rgba(0,0,0,0);
    transition: .3s;
    /* z-index: 1; */
  }


  img.post-preview-img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 100%;
  }
  
  img.post-author-img {
    opacity: 0;
    left: 20px;
    bottom: 25px;
    height: 30px;
    position: absolute;
    border-radius: 100px;
    transition: .1s;
    /* z-index: 10; */
  }
  
  a.post-author-username {
    opacity: 0;
    left: 60%;
    bottom: 10%;
    color: #ffffff;
    position: absolute;
    transition: .1s;
    /* z-index: 10; */
  }
  
  button.post-btn-faved {
    opacity: 0;
    left: 70%;
    bottom: 30px;
    color: #ffffff;
    position: absolute;
    transition: .1s;
    cursor: pointer;
    /* z-index: 20; */
  }
  
  button.is-faved { 
    color: red; 
    /* z-index: 20; */
  }
  
  /* ul.post-tag-list {
    position: absolute;
  } */

  /** Editor Form Page -------------------------------------------------*/

  .editor-form {
    padding-top: 60px;
  }

  /** Dropzone ------------------------*/

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

  /** Dropdown Select Box ----------------------------------------------*/

  .dd-wrapper {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  position: relative;
  width: 222px;
}

.dd-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  line-height: 38px;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  cursor: default;
  position: relative;
  background-color: #fff;
}

.dd-header span {
  margin-right: 20px;
}

.dd-header-title {
  font-weight: 300;
  margin: 2px 20px;
  margin-right: 30px;
}

.angle-down {
  color: #000;
  margin-right: 20px;
}

.dd-list {
  z-index: 10;
  position: absolute;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-top: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 5px -1px #e8e8e8;
          box-shadow: 0 2px 5px -1px #e8e8e8;
  font-weight: 700;
  padding: 15px 0;
  max-height: 215px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.dd-list-item {
  width: 100%;
  font-size: 1.5rem;
  padding: 8px 10px;
  line-height: 1.6rem;
  cursor: default;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dd-list-item.selected {
  color: #fff;
  background-color: #ffcc01;
}

.dd-list-item:hover {
  color: #fff;
  background-color: #ffcc01;
}

.dd-wrapper-single {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  position: relative;
  width: 265px;
}

.dd-wrapper-single .dd-header {
  border: 1px solid #ccc;
}

.dd-wrapper-single .dd-header .dd-header-name {
  font-weight: 400;
}

.dd-wrapper-single .dd-list {
  border: 1px solid #ccc;
  border-top: none;
}

  /** Modal -----------------------------------------------------*/

  /* #app {
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
  } */

  /** Animations ----------------------------------------------*/

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

`

export default GlobalStyle;

// import { createGlobalStyle } from 'styled-components'

// const GlobalStyle = createGlobalStyle`

//   /* @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500&display=swap'); */
//   /* font-family: 'Montserrat', sans-serif; */
//   /* @import url('https://fonts.googleapis.com/css?family=Didact+Gothic&display=swap'); */
//   /* font-family: 'Didact Gothic', sans-serif; */
//   /* @import url('https://fonts.googleapis.com/css?family=Varela+Round&display=swap'); */
//   /* font-family: 'Varela Round', sans-serif; */

//   *,
//   *::before,
//   *::after {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     /* text-rendering: optimizeLegibility; */
//   }

//   body {
//     font-size: 16;
//     font-weight: 400;
//     font-family: 'Montserrat';
//   }

//   #app {
//     height:100%;
//   }

//   a,
//   link,
//   button {
//     color: #8a8a8a;
//     background: transparent;

//     border: none;
//     outline: none;
//     text-decoration: none;

//     &:hover,
//     :hover {color: #080808;}

//     &:focus,
//     :focus {outline:0;}
//   }

//   ul { list-style-type: none;}

//   fieldset {
//     border: none;
//     outline: none;
//   }

//   /* @media (max-width: 416px) {} */
//   /* @media (max-width: 450px) {} */
//   /* @media (max-width: 600px) {} */
//   /* @media (max-width: 675px) {} */
//   /* @media (min-width: 768px) {} */
//   /* @media (max-width: 992px) {} */
//   /* @media (max-width: 1335px) {} */
//   /* @media (max-width: 1710px) {} */

//   /** Editor Form Page -------------------------------------------------*/

//   .editor-form {
//     padding-top: 60px;
//   }

//   .dropzone {
//     width: 100%;
//     height: 30rem;
//     display: flex;
//     color: #8a8a8a;
//     font-size: 18px;
//     justify-content: center;
//     align-items: center;
//     border-radius: 3px;
//     background-color: #eee;
//     will-change: transform;
//     border: 1px solid #eee;
//     font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//     transition: transform 0.3s;
//     &:hover {
//       cursor: default;
//     }
//   }

//   .dropzone.hover {
//     transform: scale(0.95);
//   }

//   .dropzone input {
//     display: none;
//   }

//   .dropzone svg {
//     fill: #8a8a8a;
//     animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
//   }

//   .preview {
//     width: 10rem;
//   }

//   .preview:hover{
//     opacity: .5;
//   }

//   .progress-bar {
//     height: 1rem;
//     background-color: orangered;
//   }

//   .response_wrap {
//     display: flex;
//     flex-wrap: wrap;
//   }

//   .photos {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     align-items: center;
//   }

//   @keyframes spin { 
//     100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } 
//   }
// `

// export default GlobalStyle;