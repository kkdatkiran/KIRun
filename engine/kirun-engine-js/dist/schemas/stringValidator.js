"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stringValidator;

var _constants = require("./constants");

var TIME = new RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?([+-][01][0-9]:[0-5][0-9])?$");
var DATE = new RegExp("^[0-9]{4,4}-([0][0-9]|[1][0-2])-(0[1-9]|[1-2][1-9]|3[01])$");
var DATETIME = new RegExp("^[0-9]{4,4}-([0][0-9]|[1][0-2])-(0[1-9]|[1-2][1-9]|3[01])T" + "([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?([+-][01][0-9]:[0-5][0-9])?$");

function stringValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!element || typeof element !== "string") throw "".concat((0, _constants.path)(parents, schema.title), "Expected a string found ").concat(element);

  if (schema.format === "TIME") {
    patternMatcher(parents, schema, element, TIME, "time pattern");
  } else if (schema.format === "DATE") {
    patternMatcher(parents, schema, element, DATE, "date pattern");
  } else if (schema.format === "DATETIME") {
    patternMatcher(parents, schema, element, DATETIME, "date time pattern");
  } else if (schema.pattern !== null) {
    patternMatcher(parents, schema, element, new RegExp(schema.pattern), "pattern " + schema.pattern);
  }

  if (schema.minLength && element.length < schema.minLength) {
    throw "".concat((0, _constants.path)(parents, schema.title), "Expected a minimum of ").concat(schema.minLength, " characters");
  } else if (schema.maxLength && element.length > schema.maxLength) {
    throw "".concat((0, _constants.path)(parents, schema.title), "Expected a maximum of ").concat(schema.maxLength, " characters");
  }
}

function patternMatcher(parents, schema, element, regex, message) {
  if (element.match(regex)) return;
  throw "".concat((0, _constants.path)(parents, schema.title)).concat(element, " is not matched with the ").concat(message);
}
//# sourceMappingURL=stringValidator.js.map