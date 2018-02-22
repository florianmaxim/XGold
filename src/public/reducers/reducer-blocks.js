const init = [];

export default function (state = init, action) {

  switch(action.type){

    case "RECEIVE_BLOCK":

      return [...state, action.payload];

    break;

  }

  return state;
}