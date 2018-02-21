import React from 'react';

import {Heading} from './Block_';

import ContainerBlocks from '../containers/container-blocks';

export default class Block extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            block: {
                height: props.match.params.blockHeight
            }
        }
    }

    handleOnClick(){
        this.setState({
            block: {
                height: 'Hi!'
            }
        })
    }

    render(){
        return(
            <div onClick={()=>this.handleOnClick()}>
                <Heading>
                    <h1>{this.state.block.height}(ETH)</h1>
                    <ContainerBlocks/>
                </Heading>
            </div>
        );
    }
}


/* export default ({ match }) => (

    <BlockHeight>{match.params.blockHeight}</BlockHeight>

); */