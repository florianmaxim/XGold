import React from 'react';

import ContainerOwnedBlocks from '../containers/container-owned-blocks';

export default class Account extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){}

    render(){
        return(
            <ContainerOwnedBlocks/>
        );
    }
}