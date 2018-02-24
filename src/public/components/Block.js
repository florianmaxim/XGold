import React from 'react';

import ContainerSelectedBlock from '../containers/container-selected-block';

export default class Block extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){}

    render(){
        return(
            <ContainerSelectedBlock blockNumber={this.props.match.params.blockNumber}/>
        );
    }
}