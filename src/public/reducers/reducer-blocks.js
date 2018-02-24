const init = [];

export default (state = init, action) => {

  switch(action.type){

    case "RECEIVE_BLOCK":

      return [...state, action.payload];

    break;

    case "STARTED_WATCHING_BLOCKS":

      return [...state];

    break;

  }

  return state;
}