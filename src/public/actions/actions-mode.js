export const setMode = (mode) => {

    return (dispatch) => {

        if(mode!==undefined){
            dispatch({type: "SET_MODE", payload: mode})
        }else{
            dispatch({type: "SET_MODE", payload: true})
        }
      }
  }