import ControllerBlockchain from '../controllers/controller-blockchain';

import * as config from '../../../config.json';

const Blockchain = new ControllerBlockchain();

let interval;

export const getOwnerOfBlock = (block) => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getOwnerOfBlock(block.number, (ownersAddress) => {

      block.ownersAddress = ownersAddress;

      dispatch({type: "SELECTED_BLOCK", payload: block})       //SHOULD BE: SELECTED BLOCK

    })

  }  

}

export const watchBlocks = () => {

  Blockchain.connect();

    return (dispatch) => {

      dispatch({type: "STARTED_WATCHING_BLOCKS", payload: true})

      clearInterval(interval);

      interval = setInterval(()=>{

        Blockchain.getBlock((block) => {

          //Get owner of block

          Blockchain.getOwnerOfBlock(block.number, (ownersAddress) => {

            block.ownersAddress = ownersAddress;

            dispatch({type: "RECEIVED_BLOCK", payload: block})

            dispatch({type: "SELECTED_BLOCK", payload: block})

          })
          
        })

      }, config.refresh)

    }
}

export const selectBlock = (block) => {

  return (dispatch) => {

      dispatch({type: "SELECTED_BLOCK", payload: block})

  }
}

export const getCoinbase = () => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getCoinbase((account) => {
              
      dispatch({type: "RECEIVED_COINBASE_DATA", payload:account})

    }) 

  }

}

export const getWelcome = () => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getWelcome((msg) => {
              
      dispatch({type: "GET_WELCOME", payload:msg})

    }) 

  }

}

export const buyBlock = (block) => {

  //Extract to SINGLE connect action!
  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getCoinbase((account)=>{

      //THIS SHOULD NOT HAPPEN IN HERE AT ALL
          const init = {
            number: block.number,
            hash: block.hash,
            none: block.nounce,
            size: block.size,
            transactions: block.transactions,
            ownersAddress: account.coinbase
        };

      dispatch({type: "BOUGHT_SELECTED_BLOCK", payload:init})
    })

    Blockchain.buyBlock(block.number,(result) => {

      //Received transaction hash:
      // BOUGHT_BLOCK_PENDING

      //Received transaction confirmation:
      // BOUGHT_BLOCK_SUCCESS

      //Error
      // BOUGHT_BLOCK_ERROR
              
      dispatch({type: "BOUGHT_BLOCK", payload:result})

    }) 

  }

}