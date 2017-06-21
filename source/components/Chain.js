import React, {Component} from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

let state = {
      blocks: []
    };

export default class Chain extends Component{
  constructor(props){
    super(props);

    // Retrieve the last state
    this.state = state;
  }

  componentWillUnmount() {

    this._mounted = false;
    // Remember state for the next mount
    state = this.state;
  }

  componentWillMount(){

    this.setState({
      blocks: this.state.blocks.length>0?this.state.blocks:[]
    })

  }

  componentDidMount(){

    this._mounted = true;


    addEventListener('load', (event)=>{

      var Web3 = require('web3');

      var web3 = new Web3();

          web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

      var filter = web3.eth.filter('latest');

      filter.watch((error, result)=>{
        if (!error)

          // console.log(JSON.stringify(result));

          var block = web3.eth.getBlock(result);

          console.log(`#${JSON.stringify(block.number)}`);

          // let transactions = [];
          //
          // block.transactions.forEach((txId) => {
          //
          //   // transactions.push(web3.eth.getTransaction(txId))
          //   transactions.push(web3.eth.getTransaction(JSON.stringify(block)))
          //
          // })

          if(this._mounted===true){

            //if mouted push directly into the state

            var _blocks = this.state.blocks;

                //TODO _blocks.push(transactions);
                _blocks.unshift(`#${block.number} - (${block.timestamp}) : ${block.hash}`);

            this.setState({
              blocks: _blocks
            })

          }else{

            //if not mouted store it

             state.blocks.unshift(`#${block.number} - (${block.timestamp}) : ${block.hash}`);

          }

      });

    });

  }

  render(){
    return(
      <div className="chain-container">
        <div className="chain-animation-container">
          <ReactCSSTransitionGroup transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {
            this.state.blocks.map((key, index)=>{
              return <div key={key} className="block-button block-button-fixed-width"><div style={{margin:'7px'}}>{key}</div></div>
            })
          }

          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
