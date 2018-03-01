import styled from 'styled-components';

import * as config from '../../../config.json';

const ComponentOuter = styled.div`

    z-index: 1;

    position: fixed;

    right:0;
    top:0;

    width: 300px;
    height: 75vh;

    margin-right: 50px;

    padding:0;
    
    border: ${config.helperBorder}px solid white;
    box-sizing: border-box;

    display: flex;

    flex-direction:column;
    align-items:center;
    justify-content:flex-end;

    @media (orientation: portrait ){

        justify-content:flex-end;

        left:0;

        width: 100vw;

        margin:0;
               
    }

    word-wrap: break-word;
`;

export {ComponentOuter}