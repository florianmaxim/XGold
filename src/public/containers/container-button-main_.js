import styled from 'styled-components';

const Container = styled.div`

    position: fixed;

    left:0;
    bottom:0;

    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    user-select: none;
`
  
const Outer = styled.div`

    z-index:1;
    
    width: 50px;
    height: 110px;
    opacity: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: gold;

    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

    transform: scale3d(.4,.4,.4);

    user-select: none;    
`
  
const Inner = styled.div`
    width: 45px;
    height: 19px;
    opacity: 1;
  
    background-color:rgba(80,70,25, .5);
  
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

    user-select: none;    
`

export {Container, Outer, Inner};