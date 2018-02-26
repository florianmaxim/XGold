const modes = [
    'block',
    'list'
]

let init = 0;

export default function (state = modes[init], action) {

  switch(action.type){

    case "SET_MODE":

      if(action.payload!==undefined){

        return action.payload;

      }else{

        init = init<modes.length-1?init+1:0;

        return modes[init];
        
      }

    break;

  }

  return state;
}