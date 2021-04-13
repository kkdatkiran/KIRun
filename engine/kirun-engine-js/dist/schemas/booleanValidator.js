"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = booleanValidator;

var _constants = require("./constants");

function booleanValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!element) throw "".concat((0, _constants.path)(parents, schema.title), "Expected a boolean but found null");
  if (typeof element !== "boolean") throw "".concat((0, _constants.path)(parents, schema.title)).concat(element, " is not a boolean");
}
//# sourceMappingURL=booleanValidator.js.map