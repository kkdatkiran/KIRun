"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schemas = {
  INTEGER: {
    type: "INTEGER",
    notDeletable: true
  },
  LONG: {
    type: "LONG",
    notDeletable: true
  },
  FLOAT: {
    type: "FLOAT",
    notDeletable: true
  },
  DOUBLE: {
    type: "DOUBLE",
    notDeletable: true
  },
  OBJECT: {
    type: "OBJECT",
    notDeletable: true
  },
  STRING: {
    type: "STRING",
    notDeletable: true
  },
  BOOLEAN: {
    type: "BOOLEAN",
    notDeletable: true
  },
  NULL: {
    type: "NULL",
    notDeletable: true
  },
  ARRAY: {
    type: "ARRAY",
    notDeletable: true
  },
  NUMERIC: {
    type: ["INTEGER", "LONG", "DOUBLE", "FLOAT"],
    notDeletable: true
  }
};

function add(name, schema) {
  var _schemas$name;

  if ((_schemas$name = schemas[name]) !== null && _schemas$name !== void 0 && _schemas$name.notDeletable) {
    throw "'".concat(name, "' already exists and cannot be replaced.");
  }

  schemas[name] = schema;
  return schema;
}

function find(name) {
  return schemas[name];
}

var schemaRepository = {
  schemas: schemas,
  add: add,
  find: find
};
var _default = schemaRepository;
exports["default"] = _default;