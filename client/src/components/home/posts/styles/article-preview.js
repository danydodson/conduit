import styled from 'styled-components'

import { Heart } from '../styles/svg-heart'
import { Cash } from '../styles/svg-cash'
import { Figure } from '../styles/figure-tint'
import { PreviewLink } from '../styles/link-preview'
import { AuthorLink } from '../styles/link-authimg'
import { AuthorName } from '../styles/link-authname'
import { AuthorImage } from '../styles/img-author'

export const Preview = styled.article`

  &:hover>${Cash},
  &:hover>${Heart},
  &:hover>${AuthorName} {
    opacity: 1;
  }

  &:hover>${AuthorLink}>${AuthorImage} { 
    opacity: .9; 
  }
  
  &:hover>${PreviewLink}>${Figure}:before { 
    opacity: 1;
    position: absolute;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
    background: rgba(0,0,0,0.2);
    background-image: linear-gradient(180deg, rgba(0,0,0,.2) 0, rgba(0,0,0,.199) 3.5%, rgba(0,0,0,.195) 7%, rgba(0,0,0,.19) 10.35%, rgba(0,0,0,.182) 13.85%, rgba(0,0,0,.174) 17.35%, rgba(0,0,0,.165) 20.85%, rgba(0,0,0,.155) 24.35%, rgba(0,0,0,.145) 27.85%, rgba(0,0,0,.135) 31.35%, rgba(0,0,0,.126) 34.85%, rgba(0,0,0,.118) 38.35%, rgba(0,0,0,.11) 41.85%, rgba(0,0,0,.105) 45.35%, rgba(0,0,0,.1) 48.85%, rgba(0,0,0,.103) 52.35%, rgba(0,0,0,.112) 55.85%, rgba(0,0,0,.126) 59.35%, rgba(0,0,0,.144) 62.85%, rgba(0,0,0,.165) 66.35%, rgba(0,0,0,.188) 69.85%, rgba(0,0,0,.213) 73.35%, rgba(0,0,0,.237) 76.85%, rgba(0,0,0,.262) 80.35%, rgba(0,0,0,.285) 83.85%, rgba(0,0,0,.306) 87.35%, rgba(0,0,0,.324) 90.85%, rgba(0,0,0,.338) 94.35%, rgba(0,0,0,.347) 97.85%, rgba(0,0,0,.35));
  }

  width: 100vw;
  margin: auto;

  @media (min-width: 768px) { width: 50%; }
  @media (min-width: 992px) { width: 33.33333333%; }
  @media (min-width: 1335px) { width: 416px; }
  
  /* @media (min-width: 768px) { width: calc(100vw / 2) } */
  /* @media (min-width: 992px) { width: calc(100vw / 3) } */
  /* @media (min-width: 1335px) { width: 416px } */
`