"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Block_ = require("./Block_");

var _containerBlocks = _interopRequireDefault(require("../containers/container-blocks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Block =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Block, _React$Component);

  function Block(props) {
    var _this;

    _classCallCheck(this, Block);

    _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, props));
    _this.state = {
      block: {
        height: props.match.params.blockHeight
      }
    };
    return _this;
  }

  _createClass(Block, [{
    key: "handleOnClick",
    value: function handleOnClick() {
      this.setState({
        block: {
          height: 'Hi!'
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        onClick: function onClick() {
          return _this2.handleOnClick();
        }
      }, _react.default.createElement(_Block_.Heading, null, _react.default.createElement("h1", null, this.state.block.height, "(ETH)"), _react.default.createElement(_containerBlocks.default, null)));
    }
  }]);

  return Block;
}(_react.default.Component);
/* export default ({ match }) => (

    <BlockHeight>{match.params.blockHeight}</BlockHeight>

); */


exports.default = Block;