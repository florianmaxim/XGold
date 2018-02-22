import styled from 'styled-components';

export const Outer = styled.div`

    width: 100%;
   
    border: 5px solid red;
    box-sizing: border-box;

    color: red;

    background:blue;

    display:flex;
    align-items: center;
    justify-content: flex-end;

    @media (orientation: portrait) {
        justify-content: center;
      }

`;

export const Info = styled.div`

    width: 300px;

    @media (orientation: portrait) {
        width: 90vw
    }

    margin: 25px;
   
    border: 2.5px solid green;
    box-sizing: border-box;

    background:black;

    > h1 {
        margin:0;
        color: gold;
        font-size: 3em;
        font-family: Cinzel;
        2px 2px 5px rgba(0, 0, 0, 0.25);
    }

    > h2 {
        margin:0;
        color: gold;
        font-size: 16px;
        font-family: Lato;
        font-weight: 200;
        2px 2px 5px rgba(0, 0, 0, 0.25);
        word-wrap: break-word;
    }

    > h3 {
        margin:0;
        margin-top:15px;
        color: gold;
        font-size: 16px;
        font-family: Lato;
        font-weight: bold;
        2px 2px 5px rgba(0, 0, 0, 0.25);
        word-wrap: break-word;
    }

    > h4 {
        margin-top:15px;
        color: gold;
        font-size: 16px;
        font-family: Lato;
        font-weight: 200;
        2px 2px 5px rgba(0, 0, 0, 0.25);
        word-wrap: break-word;
    }
`;