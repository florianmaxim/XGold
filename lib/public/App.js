"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Routes = _interopRequireDefault(require("./Routes"));

var _App_ = require("./App_");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return _react.default.createElement(_App_.Outer, null, _react.default.createElement(_Routes.default, null));
};

exports.default = _default;