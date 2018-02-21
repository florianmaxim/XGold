"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reduxLogger = require("redux-logger");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducers = _interopRequireDefault(require("./reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)(_reduxThunk.default, (0, _reduxLogger.createLogger)()); //const middleware = applyMiddleware(thunk)

var _default = (0, _redux.createStore)(_reducers.default, middleware);

exports.default = _default;