const init = {
    coinbase: "0x00000000000000",
    balance: "0.00"
};

export default function (state = init, action) {

  switch(action.type){

    case "RECEIVED_COINBASE_DATA":

      return action.payload;

    break;

  }

  switch(action.type){

    case "RECEIVED_CONTRACT_BALANCE":

      return {
        coinbase: state.coinbase,
        balance: action.payload
    }

    break;

  }

  return state;
}