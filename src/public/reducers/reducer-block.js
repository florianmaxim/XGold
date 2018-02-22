const init = {
    number: 1234567,
    hash: "0x5da2bc193007acd2bd45d6562a505b563c6d71a6d908ba5f659296ee2b666c9f",
    none: 1234567,
    size: 123,
    transactions: []
};

export default function (state = init, action) {

  switch(action.type){

    case "RECEIVE_SELECTED_BLOCK":

      return action.payload;

    break;

  }

  return state;
}