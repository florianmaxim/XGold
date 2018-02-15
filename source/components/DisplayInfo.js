import * as config from '../../config.json';

import {log} from './Helpers';

import React, {Component} from 'react';

import ReactMarkdown from 'react-markdown';

import {paper} from './PAPER';

export default class Info extends Component{

    constructor(props){

        super(props);

        this.state = {
            paper: false
        }

    }

    handleButton(){

        this.setState({
            paper: this.state.paper?false:true
        });

        log(`[Info] Paper: ${this.state.paper}`);

    }
    
    render(){

        return(

         !this.state.paper?


            <div className="block-buy">

                <div className="block-buy-container-price">

                    <div className="block-buy-heading">
                        {config.info.name}
                    </div>

                    <div className="block-buy-price" style={{zIndex:'10'}}>

                        <div onClick={()=>{this.handleButton(event)}} className='block-button' style={{color: 'rgba(255,255,82)', borderColor: 'rgba(255,255,82)', backgroundColor: 'black'}}>
                            {config.info.button}
                        </div>

                    </div>

                </div>

            </div>

            :
            
            <div className="block-buy">

                <div className="block-buy-container-price" >

                    <div className="block-buy-heading">
                        {config.info.name}
                    </div>

                    <div className="block-buy-price" style={{zIndex:'10'}}>

                        <div style={{height: '50vh', overflowY: 'scroll', background: 'black', border: '2px solid #ffd700'}}>
                            
                            <div style={{margin: '10px', height: 'auto'}}>
                               <ReactMarkdown source={paper}/>
                            </div>
                        
                        </div>

                        <div onClick={()=>{this.handleButton(event)}} className='block-button' style={{color: 'rgba(255,255,82)', borderColor: 'rgba(255,255,82)', backgroundColor: 'black', marginTop: '25px'}}>
                            close
                        </div>

                    </div>
                   
                </div>    

            </div>

        );
    }

}