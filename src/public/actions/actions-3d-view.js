import * as config from '../../../config.json';

export const set3DViewRotation = (rotationEnabled) => {

    return (dispatch) => {
  
        dispatch({type: "SET_3D_VIEW_ROTATION", payload: rotationEnabled}) 
  
    }
  
}

export const set3DViewControls = (controlsIndex) => {

    return (dispatch) => {
  
        dispatch({type: "SET_3D_VIEW_CONTROLS", payload: controlsIndex}) 
  
    }
  
}