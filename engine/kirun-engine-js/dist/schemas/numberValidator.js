"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = numberValidator;

var _constants = require("./constants");

function numberValidator(type, parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!element || typeof element !== "number") throw "".concat((0, _constants.path)(parents, schema.title), "Expected a number found ").concat(element);
  checkRange(type, parents, schema, element);
  checkMultipleOf(parents, schema, element);
}

function checkRange(type, parents, schema, element) {
  var msg = undefined;

  if (type === _constants.SchemaType.INTEGER || type === _constants.SchemaType.LONG) {
    var v = parseInt(element);
    if (v !== element) throw "".concat((0, _constants.path)(parents, schema.title), "Number ").concat(element, " is not of type ").concat(type);
  }

  if (schema.minimum && schema.minimum > element) msg = " should be greater than or equal to ".concat(schema.minimum);
  if (schema.maximum && schema.maximum < element) msg = " should be less than or equal to ".concat(schema.maximum);
  if (schema.exclusiveMinimum && schema.exclusiveMinimum >= element) msg = " should be greater than ".concat(schema.exclusiveMinimum);
  if (schema.exclusiveMaximum && schema.exclusiveMaximum <= element) msg = " should be less than ".concat(schema.exclusiveMaximum);
  if (!msg) return;
  return "".concat((0, _constants.path)(parents, schema.title)).concat(element).concat(msg);
}

function checkMultipleOf(parents, schema, element) {
  if (!schema.multipleOf) return;
  var x = element % schema.multipleOf;
  if (x !== 0) throw "".concat((0, _constants.path)(parents, schema.title)).concat(element, " is not a multiple of ").concat(schema.multipleOf);
}
//# sourceMappingURL=numberValidator.js.map