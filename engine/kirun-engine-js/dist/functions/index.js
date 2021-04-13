"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Math = _interopRequireWildcard(require("./Math"));

var functions = {
  namespaces: {
    Math: Math
  },
  regular: {}
};
var functionRepository = {
  add: function add(namespace, name, func) {
    if (namespace && !functions.namespaces[namespace]) functions.namespaces[namespace] = {};
    var place = namespace ? functions.namespaces[namespace] : functions.regular;
    return place[name] = func;
  },
  find: function find(namespace, name) {
    var place = namespace ? functions.namespaces[namespace] : functions.regular;
    return place[name];
  }
};
var _default = functionRepository;
exports["default"] = _default;
//# sourceMappingURL=index.js.map