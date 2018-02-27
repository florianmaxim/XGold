
const goldStates = [
  'available',
  'sold',
  'gold', //owned, payed gold price
  'nebula' //owned payed nebula price
]

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

  case "PURCHASE_GOLD_PENDING":

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

  case "PURCHASE_GOLD_SUCCEDED":

    return  {

      number: state.number,
      hash: state.hash,

      timestamp: state.timestamp, 

      nonce: state.nonce,
      size: state.size,
      transactions: state.transactions,

      ownersAddress: action.payload,
      state: 'gold'

    }

  break;

  case "PURCHASE_NEBULA_PENDING":

    return  {

      number: state.number,
      hash: state.hash,

      timestamp: state.timestamp, 

      nonce: state.nonce,
      size: state.size,
      transactions: state.transactions,

      ownersAddress: state.ownersAddress,
      state: 'gold'

    }

  break;

  case "PURCHASE_NEBULA_SUCCEDED":

    return  {

      number: state.number,
      hash: state.hash,

      timestamp: state.timestamp, 

      nonce: state.nonce,
      size: state.size,
      transactions: state.transactions,

      ownersAddress: action.payload,
      state: 'nebula'

    }

  break;


  case "SALE_PENDING":

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

case "SALE_SUCCEDED":

  return  {

    number: state.number,
    hash: state.hash,

    timestamp: state.timestamp, 

    nonce: state.nonce,
    size: state.size,
    transactions: state.transactions,

    ownersAddress: "0x0000000000000000000000000000000000000000",
    state: 'available'

  }

break;

  }

  return state;
}