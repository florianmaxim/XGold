export default function (state = {

    number: null,
    hash: "0x0000000000000000000000000000000000000000",

    timestamp: 12345678,  

    nonce: "00000000",
    size: "00000",
    transactions: [],

    ownersAddress: "0x0000000000000000000000000000000000000000",
    state: 'available'

  }, action) {

  switch(action.type){

    case "SELECTED_BLOCK":

     return {

      number: action.payload.number,
      hash: action.payload.hash,

      timestamp: action.payload.timestamp,  
  
      nonce:  action.payload.nonce,
      size:  action.payload.size,
      transactions:  action.payload.transactions,
  
      ownersAddress:  action.payload.ownersAddress,
      state: action.payload.state
  
    }

    break;

  case "PURCHASE_PENDING":

    return  {

      number: state.number,
      hash: state.hash,

      timestamp: state.timestamp, 

      nonce: state.nonce,
      size: state.size,
      transactions: state.transactions,

      ownersAddress: state.ownersAddress,
      state: 'pending'

    }

  break;

  case "PURCHASE_SUCCEDED":

    return  {

      number: state.number,
      hash: state.hash,

      timestamp: state.timestamp, 

      nonce: state.nonce,
      size: state.size,
      transactions: state.transactions,

      ownersAddress: action.payload,
      state: 'owned'

    }

  break;

  }

  return state;
}