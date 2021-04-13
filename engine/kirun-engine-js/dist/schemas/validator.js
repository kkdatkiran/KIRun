"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validate;

var _anyAllOneOfvalidator = _interopRequireDefault(require("./anyAllOneOfvalidator"));

var _typeValidator = _interopRequireDefault(require("./typeValidator"));

function validate(parents, schema, schemaRepository, functionRepository, element) {
  if (typeof schema === "string") {
    if (!schemaRepository) throw "Unable to find the ".concat(schema, " as schema repository not supplied.");
    schema = schemaRepository.find(schema);
  }

  if (!schema) return element;
  if (!element && schema.defaultValue) return schema.defaultValue;
  if (schema.constant) return schema.constant;

  if (schema.enums) {
    return enumCheck(parents, schema, schemaRepository, functionRepository, element, validate);
  }

  if (schema.type) {
    (0, _typeValidator["default"])(parents, schema, schemaRepository, functionRepository, element, validate);
  }

  if (schema.oneOf || schema.allOf || schema.anyOf) {
    (0, _anyAllOneOfvalidator["default"])(parents, schema, schemaRepository, functionRepository, element, validate);
  }

  if (schema.not) {
    var flag = false;

    try {
      validate(parents, schema.not, schemaRepository, functionRepository, element);
      flag = true;
    } catch (error) {
      flag = false;
    }

    if (flag) throw "".concat(path(parents, schema.title), "Schema validated value in not condition.");
  }

  return element;
}
//# sourceMappingURL=validator.js.map