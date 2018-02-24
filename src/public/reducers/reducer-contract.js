const init = {
    welcome: ""
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