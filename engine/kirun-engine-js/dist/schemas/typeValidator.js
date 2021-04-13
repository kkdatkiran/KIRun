"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = typeValidator;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _constants = require("./constants");

var _arrayValidator = _interopRequireDefault(require("./arrayValidator"));

var _booleanValidator = _interopRequireDefault(require("./booleanValidator"));

var _nullValidator = _interopRequireDefault(require("./nullValidator"));

var _objectValidator = _interopRequireDefault(require("./objectValidator"));

var _stringValidator = _interopRequireDefault(require("./stringValidator"));

var _numberValidator = _interopRequireDefault(require("./numberValidator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function typeValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  var valid = false;
  var list = [];
  var types = Array.isArray(schema.type) ? schema.type : [schema.type];

  var _iterator = _createForOfIteratorHelper(types),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var type = _step.value;

      try {
        typeValidation(parents, type, schema, schemaRepository, functionRepository, element, validate);
        valid = true;
        break;
      } catch (err) {
        valid = false;
        if (Array.isArray(err)) list = [].concat((0, _toConsumableArray2["default"])(list), (0, _toConsumableArray2["default"])(err));else list.push(err);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (!valid) throw ["".concat((0, _constants.path)(parents, schema.title), "Value '").concat(element, "' is not of valid type(s)")].concat((0, _toConsumableArray2["default"])(list));
}

function typeValidation(parents, type, schema, schemaRepository, functionRepository, element, validate) {
  if (type === _constants.SchemaType.STRING) {
    (0, _stringValidator["default"])(parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === _constants.SchemaType.LONG || type === _constants.SchemaType.INTEGER || type === _constants.SchemaType.DOUBLE || type === _constants.SchemaType.FLOAT) {
    (0, _numberValidator["default"])(type, parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === _constants.SchemaType.BOOLEAN) {
    (0, _booleanValidator["default"])(parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === _constants.SchemaType.OBJECT) {
    (0, _objectValidator["default"])(parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === _constants.SchemaType.ARRAY) {
    (0, _arrayValidator["default"])(parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === _constants.SchemaType.NULL) {
    (0, _nullValidator["default"])(parents, schema, element);
  } else {
    throw "".concat((0, _constants.path)(parents, schema.title)).concat(type, " is not a valid type.");
  }
}
//# sourceMappingURL=typeValidator.js.map