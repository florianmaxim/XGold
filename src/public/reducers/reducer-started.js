export default function (state = false, action) {

    switch(action.type){
  
      case "STARTED":
  
        return action.payload;
  
      break;
  
    }
  
    return state;
  }