"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Outer = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(["\n\n  @import url('https://fonts.googleapis.com/css?family=Open+Sans:Light');\n  @import url('https://fonts.googleapis.com/css?family=Cinzel');\n  @import url('https://fonts.googleapis.com/css?family=Roboto:Thin');\n\n  body {\n    margin: 0;\n    font-family: Open Sans;\n  }\n"], ["\n\n  @import url('https://fonts.googleapis.com/css?family=Open+Sans:Light');\n  @import url('https://fonts.googleapis.com/css?family=Cinzel');\n  @import url('https://fonts.googleapis.com/css?family=Roboto:Thin');\n\n  body {\n    margin: 0;\n    font-family: Open Sans;\n  }\n"]),
    _templateObject2 = /*#__PURE__*/ _taggedTemplateLiteral(["\n  width: 100vw;\n  height: 100vh;\n  box-sizing: border-box;\n  border: 5px solid gold;\n  background: black;\n"], ["\n  width: 100vw;\n  height: 100vh;\n  box-sizing: border-box;\n  border: 5px solid gold;\n  background: black;\n"]);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _styledComponents.injectGlobal)(_templateObject);

var Outer = _styledComponents.default.div(_templateObject2);

exports.Outer = Outer;