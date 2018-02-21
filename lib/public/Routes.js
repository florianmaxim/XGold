"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _About = _interopRequireDefault(require("./components/About"));

var _Block = _interopRequireDefault(require("./components/Block"));

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_reactRouter.Switch, null, _react.default.createElement(_reactRouter.Route, {
    path: "/block/:blockHeight",
    component: _Block.default
  }), _react.default.createElement(_reactRouter.Route, {
    path: "/about",
    component: _About.default
  }), _react.default.createElement(_reactRouter.Route, {
    exactPath: "/",
    component: _About.default
  }));
};

exports.default = _default;