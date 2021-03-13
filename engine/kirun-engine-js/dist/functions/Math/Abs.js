"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _schemas = _interopRequireDefault(require("../../schemas"));

var _util = require("../util");

var NUMERIC = _schemas["default"].find("NUMERIC");

var Abs = (0, _util.makeFunction)({
  name: "Abs",
  parameters: [{
    name: "value",
    schema: NUMERIC
  }],
  returns: {
    schema: NUMERIC
  }
}, function (args) {
  return {
    value: Math.abs(args.value[0].value)
  };
});
var _default = Abs;
exports["default"] = _default;