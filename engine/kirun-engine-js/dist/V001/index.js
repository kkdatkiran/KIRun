"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _schemas = _interopRequireDefault(require("../schemas"));

var _functions = _interopRequireDefault(require("../functions"));

var _statements = _interopRequireDefault(require("./statements"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var GENERAL = "general";

function addMessage(msgs, key, message) {
  if (!msgs[key]) msgs[key] = [];
  msgs[key].push(message);
}

function startStepCheck(steps, msgs, repository) {
  var _start$0$properties, _start$0$properties$p;

  var start = steps.filter(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        e = _ref2[1];

    return e.type === "START";
  });

  if (start.length === 0) {
    addMessage(msgs, GENERAL, "No start is found.");
    return;
  } else if (start.length > 1) {
    start.forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray2["default"])(_ref3, 1),
          e = _ref4[0];

      return addMessage(msgs, e, "Multiple starts found, only one is allowed.");
    });
    return;
  }

  if (!((_start$0$properties = start[0].properties) !== null && _start$0$properties !== void 0 && (_start$0$properties$p = _start$0$properties.parameters) !== null && _start$0$properties$p !== void 0 && _start$0$properties$p.length)) return;

  var _iterator = _createForOfIteratorHelper(start[0].properties.parameters),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var param = _step.value;

      if (!repository.findSchema(param.schema)) {
        addMessage(msgs, start[0][0], "Unkown schema '".concat(param.schema, "' is used for the parameter ").concat(param.name, "."));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function compile(_ref5) {
  var _code$definition;

  var code = _ref5.code,
      _ref5$functions = _ref5.functions,
      functions = _ref5$functions === void 0 ? _functions["default"] : _ref5$functions,
      _ref5$repository = _ref5.repository,
      repository = _ref5$repository === void 0 ? _schemas["default"] : _ref5$repository;
  if (!(code !== null && code !== void 0 && (_code$definition = code.definition) !== null && _code$definition !== void 0 && _code$definition.steps)) return undefined;
  var steps = Object.entries(code.definition.steps);
  var msgs = {};
  startStepCheck(steps, msgs, repository);
  return msgs;
}

function debug() {}

function execute() {}

module.exports = {
  statements: _statements["default"],
  compile: compile,
  debug: debug,
  execute: execute
};
//# sourceMappingURL=index.js.map