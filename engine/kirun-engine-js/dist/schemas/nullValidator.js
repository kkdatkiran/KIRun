"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = nullValidator;

var _constants = require("./constants");

function nullValidator(parents, schema, element) {
  if (!element) return;
  throw "".concat((0, _constants.path)(parents, schema.title), "Expected a null value but found ").concat(element);
}
//# sourceMappingURL=nullValidator.js.map