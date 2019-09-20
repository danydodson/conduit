import styled from 'styled-components'

export const Figure = styled.figure`
  margin: .8rem 0 .8rem 0;

  @media (min-width: 768px) { 
    margin: .8rem; 
  }

  &:before {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    margin: .8rem 0 .8rem 0;
    background: rgba(0,0,0,0);

    opacity: 0;
    transition: .3s;
    position: absolute;
    content: "";

    @media (min-width: 768px) {
      margin: .8rem; 
    }
  }
`