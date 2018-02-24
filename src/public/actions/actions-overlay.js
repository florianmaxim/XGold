export const fadeIn = () => {

  return (dispatch) => {

      dispatch({type: "FADE_IN_OVERLAY", payload: true})
      
    }
}

export const fadeOut = () => {

  return (dispatch) => {

      dispatch({type: "FADE_OUT_OVERLAY", payload: false})
      
    }
}