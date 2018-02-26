const init = {
    heading: true,
    data: true,
    purchase: true
}

export default function (state = init, action) {

    switch(action.type){
  
      case "TOGGLE_HEADING":
  
        return {
            heading: state.heading?false:true,
            data: state.data,
            purchase: state.purchase
        }
  
      break;

      case "TOGGLE_DATA":
  
        return {
            heading: state.heading,
            data: state.data?false:true,
            purchase: state.purchase
        }

        break;

        case "TOGGLE_PURCHASE":
  
        return {
            heading: state.heading,
            data: state.data,
            purchase: state.purchase?false:true,
        }

        break;
  
    }
  
    return state;
  }