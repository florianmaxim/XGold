import styled from 'styled-components';

const ComponentOuter = styled.div`

    position: fixed;

    right:0;
    top:0;

    width: 300px;
    //border: 5px solid white;

    margin: 50px;

    display: flex;

    flex-direction:column;
    align-items:center;
    justify-content:space-between;

    @media (orientation: portrait ){

        left:0;
        bottom:25vh;

        width: 100vw;

        margin:0;
        margin-top:12.5vh;
               
    }

    word-wrap: break-word;
`;

export {ComponentOuter}