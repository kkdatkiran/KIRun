import { SchemaType } from "./constants";

const schemas = {
  INTEGER: {
    type: SchemaType.INTEGER,
    notDeletable: true,
  },
  LONG: {
    type: SchemaType.LONG,
    notDeletable: true,
  },
  FLOAT: {
    type: SchemaType.FLOAT,
    notDeletable: true,
  },
  DOUBLE: {
    type: SchemaType.DOUBLE,
    notDeletable: true,
  },
  OBJECT: {
    type: SchemaType.OBJECT,
    notDeletable: true,
  },
  STRING: {
    type: SchemaType.STRING,
    notDeletable: true,
  },
  BOOLEAN: {
    type: SchemaType.BOOLEAN,
    notDeletable: true,
  },
  NULL: {
    type: SchemaType.NULL,
    notDeletable: true,
  },
  ARRAY: {
    type: SchemaType.ARRAY,
    notDeletable: true,
  },
  NUMERIC: {
    type: [SchemaType.INTEGER, SchemaType.LONG, SchemaType.DOUBLE, SchemaType.FLOAT],
    notDeletable: true,
  },
};

function add(name, schema) {
  if (schemas[name]?.notDeletable) {
    throw `'${name}' already exists and cannot be replaced.`;
  }
  schemas[name] = schema;
  return schema;
}

function find(name) {
  return schemas[name];
}

const schemaRepository = {
  schemas,
  add,
  find,
};

export default schemaRepository;
