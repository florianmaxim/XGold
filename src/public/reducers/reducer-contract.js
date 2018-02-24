const init = {
    welcome: "lala",
    balance: 0,
    amountOfBlocks: 0
};

export default function (state = init, action) {

  switch(action.type){

    case "RECEIVED_CONTRACT_WELCOME":

      return {
          balance: state.balance,
          welcome: action.payload,
          amountOfBlocks: state.amountOfBlocks
      };

    break;

    case "RECEIVED_CONTRACT_BALANCE":

      return{
        welcome: state.welcome,
        balance: action.payload,
        amountOfBlocks: state.amountOfBlocks
    };

    break;

    case "RECEIVED_CONTRACT_AMOUNT_OF_BLOCKS":

      return{
          welcome: state.welcome,
          balance: state.balance,
          amountOfBlocks: action.payload
      };

    break;

  }

  return state;
}