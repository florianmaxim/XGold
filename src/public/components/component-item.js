import styled from 'styled-components';

const ComponentItem = styled.div`

  width:inherit;

  margin: 12.5px;
  //padding:10px;

  background: transparent;
  color:gold;

  word-break: break-all;

  @media(orientation: portrait){
      width: 90vw;
  }

  &:hover {
    background: gold;
    color:black;
  }

  > h2 {
    width:inherit;
    margin:0;
    color: inherit;
    font-size: 16px;
    font-family: Lato;
    font-weight: 200;
    2px 2px 5px rgba(0, 0, 0, 0.25);
    word-break: break-all;
    word-wrap: break-word;
  }

  > h3 {
    width:inherit;
    margin:0;
    color: inherit;
    font-size: 16px;
    font-family: Lato;
    font-weight: bold;
    2px 2px 5px rgba(0, 0, 0, 0.25);
    word-break: break-all;
    word-wrap: break-word;
  }

  > h4 {
    width:inherit;
    margin:0;
    color: inherit;
    font-size: 16px;
    font-family: Lato;
    font-weight: 200;
    2px 2px 5px rgba(0, 0, 0, 0.25);
    word-break: break-all;
    word-wrap: break-word;
  }
`;

export {ComponentItem}