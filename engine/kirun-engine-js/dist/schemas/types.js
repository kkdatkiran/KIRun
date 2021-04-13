"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.path = path;
exports["default"] = void 0;
var _default = {
  STRING: "STRING",
  INTEGER: "INTEGER",
  LONG: "LONG",
  FLOAT: "FLOAT",
  DOUBLE: "DOUBLE",
  OBJECT: "OBJECT",
  ARRAY: "ARRAY",
  BOOLEAN: "BOOLEAN",
  NULL: "NULL"
};
exports["default"] = _default;

function path(parents, title) {
  var _ref;

  return ((_ref = parents !== null && parents !== void 0 ? parents : parents.length) !== null && _ref !== void 0 ? _ref : []).join("/") + "/" + title;
}