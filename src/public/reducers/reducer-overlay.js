const init = false;

export default function (state = init, action) {

  switch(action.type){

    case "FADE_IN_OVERLAY":

      return true;

    break;

    case "FADE_OUT_OVERLAY":

      return false;

  break;

  }

  return state;
}