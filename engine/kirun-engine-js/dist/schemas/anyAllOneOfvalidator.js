"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = anyAllOneOfvalidator;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _constants = require("./constants");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function anyAllOneOfvalidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  var _schema$oneOf, _schema$allOf, _schema$anyOf;

  var list = [];
  if ((_schema$oneOf = schema.oneOf) !== null && _schema$oneOf !== void 0 && _schema$oneOf.length) oneOf(parents, schema, schemaRepository, functionRepository, element, list, validate);else if ((_schema$allOf = schema.allOf) !== null && _schema$allOf !== void 0 && _schema$allOf.length) allOf(parents, schema, schemaRepository, functionRepository, element, list, validate);else if ((_schema$anyOf = schema.anyOf) !== null && _schema$anyOf !== void 0 && _schema$anyOf.length) anyOf(parents, schema, schemaRepository, functionRepository, element, list, validate);
  return element;
}

function anyOf(parents, schema, schemaRepository, functionRepository, element, list, validate) {
  var flag = false;

  var _iterator = _createForOfIteratorHelper(schema.anyOf),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var s = _step.value;

      try {
        validate(parents, s, schemaRepository, functionRepository, element);
        flag = true;
        break;
      } catch (err) {
        flag = false;
        list.add(err);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (!flag) {
    throw ["".concat((0, _constants.path)(parents, schema.title), "The value don't satisfy any of the schemas.")].concat((0, _toConsumableArray2["default"])(list));
  }
}

function allOf(parents, schema, schemaRepository, functionRepository, element, list, validate) {
  var flag = 0;

  var _iterator2 = _createForOfIteratorHelper(schema.allOf),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var s = _step2.value;

      try {
        validate(parents, s, schemaRepository, functionRepository, element);
        flag++;
      } catch (err) {
        list.add(err);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if (flag !== schema.allOf.length) {
    throw ["".concat((0, _constants.path)(parents, schema.title), "The value doesn't satisfy some of the schemas.")].concat((0, _toConsumableArray2["default"])(list));
  }
}

function oneOf(parents, schema, schemaRepository, functionRepository, element, list, validate) {
  var flag = 0;

  var _iterator3 = _createForOfIteratorHelper(schema.oneOf),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var s = _step3.value;

      try {
        validate(parents, s, schemaRepository, functionRepository, element);
        flag++;
      } catch (err) {
        list.add(err);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if (flag === 0) throw ["".concat((0, _constants.path)(parents, schema.title), "The value does not satisfy any schema.")].concat((0, _toConsumableArray2["default"])(list));
  if (flag !== 1) throw ["".concat((0, _constants.path)(parents, schema.title), "The value satisfy more than one schema.")].concat((0, _toConsumableArray2["default"])(list));
}
//# sourceMappingURL=anyAllOneOfvalidator.js.map