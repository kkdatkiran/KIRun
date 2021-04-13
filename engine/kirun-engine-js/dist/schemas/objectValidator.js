"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = objectValidator;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _constants = require("./constants");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function objectValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!element || (0, _typeof2["default"])(element) !== "object" && !Array.isArray(element)) throw "".concat((0, _constants.path)(parents, schema.title), "Expected an object found ").concat(element);
  var keys = new Set(Object.keys(element));
  checkMinMaxProperties(parents, schema, keys);

  if (schema.propertyNames) {
    checkPropertyNameSchema(parents, schema, schemaRepository, functionRepository, keys, validate);
  }

  if (schema.required) {
    checkRequired(parents, schema, jsonObject);
  }

  if (schema.properties) {
    keys = ((0, _readOnlyError2["default"])("keys"), checkProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate));
  }

  if (schema.patternProperties) {
    keys = ((0, _readOnlyError2["default"])("keys"), checkPatternProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate));
  }

  if (schema.additionalProperties) {
    checkAddtionalProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate);
  }

  if (schema.dependencies) {
    chekDependencies(parents, schema, jsonObject);
  }
}

function checkMinMaxProperties(parents, schema, keys) {
  if (schema.minProperties && keys.size < schema.minProperties) throw "".concat((0, _constants.path)(parents, schema.title), "Object should have minimum of ").concat(schema.minProperties, " properties.");
  if (schema.maxProperties && keys.size > schema.maxProperties) throw "".concat((0, _constants.path)(parents, schema.title), "Object should have minimum of ").concat(schema.maxProperties, " properties.");
}

function checkPropertyNameSchema(parents, schema, schemaRepository, functionRepository, keys, validate) {
  var list = [];

  var _iterator = _createForOfIteratorHelper(keys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _key = _step.value;

      try {
        validate(parents, schema.propertyNames, schemaRepository, functionRepository, _key);
      } catch (err) {
        list.push(err);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (list.length) throw list;
}

function checkRequired(parents, schema, jsonObject) {
  var _iterator2 = _createForOfIteratorHelper(schema.required),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _key2 = _step2.value;
      if (!jsonObject[_key2]) throw "".concat((0, _constants.path)(parents, schema.title), "is mandatory.");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function chekDependencies(parents, schema, jsonObject) {
  var e = undefined;

  for (var dependency in schema.dependencies) {
    e = jsonObject[dependency];
    if (!e) continue;

    var _iterator3 = _createForOfIteratorHelper(schema.dependencies[dependency]),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var k = _step3.value;
        if (!jsonObject[k]) throw "".concat((0, _constants.path)(parents, schema.title)).concat(dependency, " requires ").concat(k);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
}

function checkAddtionalProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate) {
  if ((0, _typeof2["default"])(schema.additionalProperties.schemaValue) === "object") {
    var _iterator4 = _createForOfIteratorHelper(keys),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _key3 = _step4.value;
        var newParents = [].concat((0, _toConsumableArray2["default"])(parents !== null && parents !== void 0 ? parents : []), [_key3]);
        jsonObject[_key3] = validate(newParents, schema.additionalProperties, schemaRepository, functionRepository, jsonObject[_key3]);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  } else if (typeof schema.additionalProperties.booleanValue === "boolean") {
    if (!schema.additionalProperties.booleanValue && keys.size === 0) throw "".concat((0, _constants.path)(parents, schema.title)).concat(Array.from(keys).join(", "), " are additonal properties which are not allowed.");
  }
}

function checkPatternProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate) {
  var compiledPatterns = {};

  var _iterator5 = _createForOfIteratorHelper(schema.patternProperties),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var keyPattern = _step5.value;
      compiledPatterns[keyPattern] = new RegExp(keyPattern);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  var goodKeys = new Set();

  var _iterator6 = _createForOfIteratorHelper(keys),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _key4 = _step6.value;
      var newParents = [].concat((0, _toConsumableArray2["default"])(parents !== null && parents !== void 0 ? parents : []), [_key4]);

      for (var _i = 0, _Object$entries = Object.entries(compiledPatterns); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
            k = _Object$entries$_i[0],
            v = _Object$entries$_i[1];

        if (_key4.match(v)) {
          jsonObject[_key4] = validate(newParents, schema.patternProperties[k], schemaRepository, functionRepository, jsonObject[_key4]);
          goodKeys.add(_key4);
          break;
        }
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  return keys.filter(function (e) {
    return goodKeys.has(e);
  });
}

function checkProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate) {
  var goodKeys = new Set();

  for (var _i2 = 0, _Object$entries2 = Object.entries(schema.properties); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2),
        k = _Object$entries2$_i[0],
        s = _Object$entries2$_i[1];

    var newParents = [].concat((0, _toConsumableArray2["default"])(parents !== null && parents !== void 0 ? parents : []), [k]);
    jsonObject[k] = validate(newParents, s, schemaRepository, functionRepository, jsonObject[k]);
    goodKeys.add(key);
  }

  return keys.filter(function (e) {
    return goodKeys.has(e);
  });
}
//# sourceMappingURL=objectValidator.js.map