"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var schemas = {
  INTEGER: {
    type: _constants.SchemaType.INTEGER,
    notDeletable: true
  },
  LONG: {
    type: _constants.SchemaType.LONG,
    notDeletable: true
  },
  FLOAT: {
    type: _constants.SchemaType.FLOAT,
    notDeletable: true
  },
  DOUBLE: {
    type: _constants.SchemaType.DOUBLE,
    notDeletable: true
  },
  OBJECT: {
    type: _constants.SchemaType.OBJECT,
    notDeletable: true
  },
  STRING: {
    type: _constants.SchemaType.STRING,
    notDeletable: true
  },
  BOOLEAN: {
    type: _constants.SchemaType.BOOLEAN,
    notDeletable: true
  },
  NULL: {
    type: _constants.SchemaType.NULL,
    notDeletable: true
  },
  ARRAY: {
    type: _constants.SchemaType.ARRAY,
    notDeletable: true
  },
  NUMERIC: {
    type: [_constants.SchemaType.INTEGER, _constants.SchemaType.LONG, _constants.SchemaType.DOUBLE, _constants.SchemaType.FLOAT],
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
//# sourceMappingURL=index.js.map