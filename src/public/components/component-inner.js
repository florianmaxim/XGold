import styled from 'styled-components';

const ComponentInner = styled.div`

    z-index: 10;

    margin:0;

    transition: 1s all;

    display: flex;
    flex-direction:column;

    width: 100%;

    opacity: {${props => props.toggle?'1':'0'}};

    @media (orientation: portrait ){

        //border: 5px solid gold;

        width: 75vw;
       
    }

    > h1 {
        width:inherit;
        margin:0;
        color: gold;
        font-size: 3em;
        font-family: Cinzel;
        //text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.5);
        word-wrap: break-word;
    }

    > h2 {
        width:inherit;
        margin:0;
        color: gold;
        font-size: 16px;
        font-family: Lato;
        font-weight: 200;
        2px 2px 5px rgba(0, 0, 0, 0.25);
        word-wrap: break-word;
    }

    > h3 {
        width:inherit;
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
        width:inherit;
        margin-top:15px;
        color: gold;
        font-size: 16px;
        font-family: Lato;
        font-weight: 200;
        2px 2px 5px rgba(0, 0, 0, 0.25);
        word-wrap: break-word;
        text-align:center;
    }
`;


export {ComponentInner};