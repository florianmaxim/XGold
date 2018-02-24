export default function (state = {

  number: "0000000",
  hash: "0x0000000000000000000000000000000000000000",
  none: "00000000",
  size: "00000",
  transactions: [],
  ownersAddress: "0x0000000000000000000000000000000000000000"

  }, action) {

  switch(action.type){

    //SHOULD BE: SELECTED_BLOCK
    case "RECEIVE_SELECTED_BLOCK":

      return action.payload;

    break;

    case "SELECTED_BLOCK":

     return action.payload;

    break;

    case "BOUGHT_SELECTED_BLOCK":

    return action.payload;

   break;

  }

  return state;
}