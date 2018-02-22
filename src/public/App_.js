import styled, {injectGlobal} from 'styled-components';

injectGlobal`

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:Light');
  @import url('https://fonts.googleapis.com/css?family=Cinzel');
  @import url('https://fonts.googleapis.com/css?family=Roboto:Thin');
  @import url('https://fonts.googleapis.com/css?family=Lato');

  body {
    margin: 0;
    font-family: Open Sans;
  }
`;

export const Outer = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  border: 5px solid gold;
  background: black;
`;