const init = {
    coinbase: "0x00000000000000",
    balance: "0.00"
};

export default function (state = init, action) {

  switch(action.type){

    case "GET_ACCOUNT":

      return action.payload;

    break;

  }

  return state;
}