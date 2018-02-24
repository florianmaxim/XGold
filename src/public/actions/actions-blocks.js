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

//TODO: SHOULDNT THE INTERVAL BE IN THE VIEW ONLY?!
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

            //dispatch({type: "SELECTED_BLOCK", payload: block})

          })
          
        })

      }, config.refresh)

    }
}

export const getBlock = (blockNumber) => {

  Blockchain.connect();

    return (dispatch) => {

      Blockchain.getSingleBlock(blockNumber, (block) => {

        //Get owner of block

        Blockchain.getOwnerOfBlock(blockNumber, (ownersAddress) => {

          block.ownersAddress = ownersAddress;

          dispatch({type: "SELECTED_BLOCK", payload: block})

        })
        
      })

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

export const sellBlock = (block) => {

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
            ownersAddress: "0x0000000000000000000000000000000000000000"
        };

      dispatch({type: "SOLD_SELECTED_BLOCK", payload:init})
    })

    Blockchain.sellBlock(block.number,(result) => {

      dispatch({type: "SOLD_BLOCK", payload:result})

    }) 

  }

}


export const getContractBalance = () => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getContractBalance((balance)=>{

      dispatch({type: "RECEIVED_CONTRACT_BALANCE", payload:balance})

    });
    
  }
}

export const getContractWelcome = () => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getContractWelcome((msg) => {
              
      dispatch({type: "RECEIVED_CONTRACT_WELCOME", payload:msg})

    }); 

  }

}

export const getContractAmountOfBlocks = () => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getContractAmountOfBlocks((amount) => {
              
      dispatch({type: "RECEIVED_CONTRACT_AMOUNT_OF_BLOCKS", payload:amount})

    }); 

  }

}