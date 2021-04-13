"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.path = path;
exports.SchemaType = void 0;
var SchemaType = {
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
exports.SchemaType = SchemaType;

function path(parents, title) {
  var prefix = (parents !== null && parents !== void 0 ? parents : []).join("/");
  if (prefix) prefix += "/";
  if (title) return "".concat(prefix).concat(title, " ");
  return "";
}
//# sourceMappingURL=constants.js.map