import * as config from '../../../config.json';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import GoldController from '../controllers/controller-gold';

const ControllerGold = new GoldController();

class ContainerGold extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    //Init Gold Element
    let element = ControllerGold.init()

    //Append HTML Canvas Element
    this.refs.gold.appendChild(element);

  }

  componentWillReceiveProps(props){

      if(ControllerGold.getGold()&&props.selectedBlock&&props.selectedBlock.state==='nebula'||props.selectedBlock.state==='gold'){
        ControllerGold.updateGold(props.selectedBlock);
      }else{
        ControllerGold.generateGold(props.selectedBlock);
      }
  }

  render(){
    return(
        <div ref="gold" style={{width:'100vw',height:'100vh'}}/>
    );
}

}

function props(state) {

  return {

    selectedBlock: state.selectedBlock

  };

}

function actions(dispatch){

  return bindActionCreators({

  }, dispatch);

}

export default connect(props, actions)(ContainerGold);