import React from 'react';

import ContainerAbout from '../containers/container-about';

export default class ComponentAbout extends React.Component {

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
            <ContainerAbout/>
        );
    }
}