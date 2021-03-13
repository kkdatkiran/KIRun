"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeFunction = makeFunction;

var _validator = _interopRequireDefault(require("../schemas/validator"));

function makeFunction(signature, func) {
  return {
    signature: signature,
    execute: function execute(inArguments, schemaRepository, functionRepository) {
      for (var i = 0; i < args.size(); i++) {
        inArguments[i].argumentIndex = i;
      }

      inArguments.reduce(function (a, c) {
        if (!a[c.name]) a[c.name] = [];
        a[c.name].push(c);
        return a;
      }, {});
      var args = {};
      signature.parameters.forEach(function (e) {
        var argList = args[e.name];
        if (!e.isVariableArgument && (argList === null || argList.length !== 1)) throw "Expects one argument with name ".concat(e.name);
        if (argList) argList.forEach(function (a) {
          return (0, _validator["default"])(null, e.schema, schemaRepository, functionRepository, a.value);
        });
      });
      return func(args, schemaRepository, functionRepository);
    }
  };
}