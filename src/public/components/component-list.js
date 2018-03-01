import styled from 'styled-components';

const ComponentList = styled.div`
    
    width: 300px;
    height: 300px;

    overflow-y:scroll;
    overflow-x:scroll;

    padding: 0;

    display: flex;

    flex-direction:column-reverse;
    align-items:flex-start;
    justify-content:flex-end;

    @media (orientation: portrait ){

        left:0;
        bottom:25vh;

        width: 100vw;

        margin:0;
        margin-top:12.5vh;
               
    }
`;

export {ComponentList}