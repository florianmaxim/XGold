import ControllerBlockchain from '../controllers/controller-blockchain';

import * as config from '../../../config.json';

const Blockchain = new ControllerBlockchain();

let interval;

/*
  Blocks
*/

export const getBlock = (blockNumber) => {

  Blockchain.connect();

    return (dispatch) => {

      Blockchain.getBlock(blockNumber, (block) => {

        dispatch({type: "SELECTED_BLOCK", payload: block})
        
      })

    }
}

export const selectBlock = (block) => {

  return (dispatch) => {

      dispatch({type: "SELECTED_BLOCK", payload: block})

  }
}

export const buyBlock = (blockNumber) => {

  Blockchain.connect();

  return (dispatch) => {

    dispatch({type: "PURCHASE_PENDING"});

    Blockchain.buyBlock(blockNumber,(block) => {

      dispatch({type: "PURCHASE_SUCCEDED"});

    })

  }

}

export const sellBlock = (block) => {

  //Extract to SINGLE connect action!
  Blockchain.connect();

  return (dispatch) => {

    dispatch({type: "SALE_PENDING", payload: true})

    Blockchain.sellBlock(block.number,(result) => {

      dispatch({type: "SALE_SUCCEDED", payload:result})

    }) 

  }

}

export const watchBlocks = () => {

  Blockchain.connect();

    return (dispatch) => {

      dispatch({type: "STARTED_WATCHING_BLOCKS", payload: true})

      clearInterval(interval);

      let prev = {number: 0};

      interval = setInterval(()=>{

        Blockchain.getBlock("latest", (block) => {

          if(block.number!==prev.number){
            dispatch({type: "RECEIVED_BLOCK", payload: block})
            prev = block;
          }
          
        })

      }, config.refresh)

    }
}

/*
  Contract
*/

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




export const getOwnerOfBlock = (block) => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getOwnerOfBlock(block.number, (ownersAddress) => {

      block.ownersAddress = ownersAddress;

      dispatch({type: "SELECTED_BLOCK", payload: block})       //SHOULD BE: SELECTED BLOCK

    })

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