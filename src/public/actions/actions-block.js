import axios from 'axios';

import BlockchainController from '../controllers/Blockchain';

const Blockchain = new BlockchainController();

export const getBlock = () => {

  return (dispatch) => {

    Blockchain.connect();

    Blockchain.getBlock((block) => {

      dispatch({type: "RECEIVE_SELECTED_BLOCK", payload: block})
      
    })

  }
}