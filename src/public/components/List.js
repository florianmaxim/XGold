import React from 'react';

import {Heading} from './List_';

import ContainerBlocks from '../containers/container-list';

export default class Block extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            block: {
                height: props.match.params.blockHeight
            }
        }
    }

    componentDidMount(){


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
                    <h1>Blocks</h1>
                    <ContainerBlocks/>
                </Heading>
            </div>
        );
    }
}


/* export default ({ match }) => (

    <BlockHeight>{match.params.blockHeight}</BlockHeight>

); */