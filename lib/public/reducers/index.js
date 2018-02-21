"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducerBlocks = _interopRequireDefault(require("./reducer-blocks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)({
  blocks: _reducerBlocks.default
});
var _default = reducer;
exports.default = _default;