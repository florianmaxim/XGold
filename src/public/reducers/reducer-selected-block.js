const init = {
    number: "0000000",
    hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    none: "00000000",
    size: "00000",
    transactions: []
};

export default function (state = init, action) {

  switch(action.type){

    case "RECEIVE_SELECTED_BLOCK":

      return action.payload;

    break;

    case "SELECT_BLOCK":

     return action.payload;

    break;

  }

  return state;
}