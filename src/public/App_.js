import styled, {injectGlobal} from 'styled-components';

injectGlobal`

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:Light');
  @import url('https://fonts.googleapis.com/css?family=Cinzel');
  @import url('https://fonts.googleapis.com/css?family=Roboto:Thin');
  @import url('https://fonts.googleapis.com/css?family=Lato');

  body {
    margin: 0;
    padding:0;
    font-family: Open Sans;
    background: black;
  }

  *{
    user-select:none;
    text-shadow: 0px -0px 5px rgba(255, 215, 0, .5);
  }

  a{
    user-select:none;
    text-decoration:none;
  }

  html {
    overflow: scroll;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
      width: 0px;  /* remove scrollbar space */
      background: transparent;  /* optional: just make scrollbar invisible */
  }
  /* optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
      background: #FF0000;
  }

`;

export const Outer = styled.div`
  width: 100vw;

  box-sizing: border-box;
  border: ${props => props.frame ? '5' : '0'}px solid gold;
  
  background: black;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  user-select:none;
`;