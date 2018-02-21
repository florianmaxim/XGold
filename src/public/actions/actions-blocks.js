import axios from 'axios';

/* 
const pseudo = [
  {
    _id: "1",
    title: "lala",
    text: "lolo."
  },
  {
    _id: "1",
    title: "lele",
    text: "lulu"
  }
]
 */

const init = {
    height: 123456789
}

let url = 'https://api.blockcypher.com/v1/eth/main';

export const fetchBlocks = () => {

  return (dispatch) => {

    axios.get(`${url}`)

      .then((response) => {        
        dispatch({type: "RECEIVE_BLOCKS", payload: {height:response.data.height}})
      })

      .catch((err) => {
        dispatch({type: "RECEIVE_BLOCKS_ERROR", payload: err})
      });

    dispatch({type: "RECEIVE_BLOCKS", payload: init})

  }
}