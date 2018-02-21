"use strict";

var config = _interopRequireWildcard(require("../config.json"));

var _chalk = _interopRequireDefault(require("chalk"));

var _http = require("http");

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactRouter = require("react-router");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _styledComponents = require("styled-components");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reducers = _interopRequireDefault(require("./public/reducers"));

var _App = _interopRequireDefault(require("./public/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var store = (0, _redux.createStore)(_reducers.default);
var app = (0, _express.default)();
app.use('/', _express.default.static(_path.default.resolve(__dirname, 'public')));
app.get('*', function (req, res) {
  var context = {};
  var sheet = new _styledComponents.ServerStyleSheet();

  var html = _server.default.renderToString(sheet.collectStyles(_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_reactRouter.StaticRouter, {
    location: req.url,
    context: context
  }, _react.default.createElement(_App.default, null)))));

  var styles = sheet.getStyleTags();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write("<!doctype html><html><head><title></title>".concat(styles, "</head><body><div id=\"root\">").concat(html, "</div><script src=\"/bundle.js\"></script></body></html>"));
    res.end();
  }
});
app.listen(config.port, function () {
  console.log("\n    [".concat(_chalk.default.hex('#FFD700').bold(config.name), " ").concat(_chalk.default.red("(".concat(config.version.number, ")")), " \"").concat(_chalk.default.blue(config.version.name), "\"]\n    - Listening on port ").concat(_chalk.default.yellow(config.port), "\n  "));
});