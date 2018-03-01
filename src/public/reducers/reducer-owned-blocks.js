const init = [];

export default (state = init, action) => {

  switch(action.type){

    case "RECEIVED_OWNED_BLOCK":

    if(state.some((block) => block.number === action.payload.number)){
        
        return state;
    }else{
        
        return [...state, action.payload];
    }

  }

  return state;
}