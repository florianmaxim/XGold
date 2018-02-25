export const toggleHeading = () => {
  
      return (dispatch) => {

        dispatch({type: "TOGGLE_HEADING"})

      }
  }

export const toggleData = () => {
  
    return (dispatch) => {

      dispatch({type: "TOGGLE_DATA"})

    }
}

export const togglePurchase = () => {
  
    return (dispatch) => {

      dispatch({type: "TOGGLE_PURCHASE"})

    }
}