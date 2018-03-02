const init = {
    rotation: true,
    controls: true
};

export default function (state = init, action) {

  switch(action.type){

    case "SET_3D_VIEW_ROTATION":

      return {
        rotation: action.payload,
          controls: state.controls
      }

    break;

    case "SET_3D_VIEW_CONTROLS":

      return {
            rotation: state.rotation,
            controls: action.payload
      }

    break;

  }

  return state;
}