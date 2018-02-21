"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var init = null;

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "RECEIVE_BLOCKS":
      return action.payload;
      break;
  }

  return state;
}