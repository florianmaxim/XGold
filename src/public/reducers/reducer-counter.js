export default function (state = 0, action) {

  switch(action.type){

    case "SET_COUNTER":

      return action.payload;

    break;

  }

  return state;
}