import ControllerBlockchain from '../controllers/controller-blockchain';

import * as config from '../../../config.json';

const Blockchain = new ControllerBlockchain();

let interval;

/*
  Blocks
*/

export const selectBlock = (block) => {

  return (dispatch) => {

      console.log(block.state)

      dispatch({type: "SELECTED_BLOCK", payload: block})

  }
}

export const getBlock = (blockNumber) => {

  Blockchain.connect();

    return (dispatch) => {

      Blockchain.getBlock(blockNumber, (block) => {

        dispatch({type: "SELECTED_BLOCK", payload: block})
        
      })

    }
}


export const buyGoldBlock = (blockNumber) => {

  Blockchain.connect();

  return (dispatch) => {

    dispatch({type: "PURCHASE_GOLD_PENDING"});

    Blockchain.buyGoldBlock(blockNumber, () => {

      dispatch({type: "PURCHASE_GOLD_SUCCEDED"});

    })

  }

}

export const buyNebulaBlock = (blockNumber) => {

  console.log('triggered buy nebula action')

  Blockchain.connect();

  return (dispatch) => {

    dispatch({type: "PURCHASE_NEBULA_PENDING"});

    Blockchain.buyNebulaBlock(blockNumber, () => {

      dispatch({type: "PURCHASE_NEBULA_SUCCEDED"});

    })

  }

}

export const sellBlock = (blockNumber) => {

  //Extract to SINGLE connect action!
  Blockchain.connect();

  return (dispatch) => {

    dispatch({type: "SALE_PENDING"})

    Blockchain.sellBlock(blockNumber ,(result) => {

      dispatch({type: "SALE_SUCCEDED"})

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

export const getContractTotalBalance = () => {

  Blockchain.connect();

  return (dispatch) => {

    Blockchain.getContractTotalBalance((balance)=>{

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