import ControllerBlockchain from '../controllers/controller-blockchain';

import * as config from '../../../config.json';

const Blockchain = new ControllerBlockchain();

export const getBlocksOfSender = () => {

    Blockchain.connect();
  
    return (dispatch) => {
  
      Blockchain.getBlocksOfSender((result) => {

        const blocks = result;

        blocks.map((blockNumber, index) => {

            Blockchain.getBlock(blockNumber , (block) => {

                dispatch({type: "RECEIVED_OWNED_BLOCK", payload: block})

            });          
            
        });

      }) 
  
    }
  
  }