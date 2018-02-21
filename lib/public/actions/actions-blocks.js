"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchBlocks = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var init = {
  height: 123456789
};
var url = 'https://api.blockcypher.com/v1/eth/main';

var fetchBlocks = function fetchBlocks() {
  return function (dispatch) {
    _axios.default.get("".concat(url)).then(function (response) {
      dispatch({
        type: "RECEIVE_BLOCKS",
        payload: {
          height: response.data.height
        }
      });
    }).catch(function (err) {
      dispatch({
        type: "RECEIVE_BLOCKS_ERROR",
        payload: err
      });
    });

    dispatch({
      type: "RECEIVE_BLOCKS",
      payload: init
    });
  };
};

exports.fetchBlocks = fetchBlocks;