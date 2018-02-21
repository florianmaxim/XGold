
const init = null;

export default function (state = init, action) {

  switch(action.type){

    case "RECEIVE_BLOCKS":
      return action.payload
    break;

  }
  return state;
}