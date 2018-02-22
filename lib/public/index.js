"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _Store = _interopRequireDefault(require("./Store"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.hydrate)(_react.default.createElement(_reactRedux.Provider, {
  store: _Store.default
}, _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_App.default, null))), document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}