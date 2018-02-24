import React from 'react';

import ContainerListedBlocks from '../containers/container-listed-blocks';

export default class ComponentList extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            block: {
                height: props.match.params.blockHeight
            }
        }
    }

    render(){
        return(
            <ContainerListedBlocks/>
        );
    }
}