import BlockchainController from '../controllers/Blockchain';

import * as config from '../../../config.json';

const Blockchain = new BlockchainController();

let interval;

export const watchBlocks = () => {

  Blockchain.connect();

    return (dispatch) => {

      dispatch({type: "STARTED_WATCHING_BLOCKS", payload: true})

      clearInterval(interval);

      interval = setInterval(()=>{

        Blockchain.getBlock((block) => {

          dispatch({type: "RECEIVE_BLOCK", payload: block})

          dispatch({type: "SELECT_BLOCK", payload: block})
          
        })

      }, config.refresh)

    }
}

export const selectBlock = (block) => {

  return (dispatch) => {

      dispatch({type: "SELECT_BLOCK", payload: block})

  }
}

export const getCoinbase = () => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getCoinbase((account) => {
              
      dispatch({type: "GET_ACCOUNT", payload:account})

    }) 

  }

}