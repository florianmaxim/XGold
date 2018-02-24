const init = {
    welcome: "",
    balance: 0,
    blocks: 0
};

export default function (state = init, action) {

  switch(action.type){

    case "RECEIVED_WELCOME":

      return {
          welcome: action.payload
        };

    break;

  }

  return state;
}