import axios from 'axios';

import BlockchainController from '../controllers/Blockchain';

const Blockchain = new BlockchainController();

export const watchBlocks = () => {

  return (dispatch) => {

    Blockchain.connect();

    Blockchain.watch((block) => {

      dispatch({type: "RECEIVE_BLOCK", payload: block})
      
    })

  }
}