const schemas = {
  INTEGER: {
    type: "INTEGER",
    notDeletable: true,
  },
  LONG: {
    type: "LONG",
    notDeletable: true,
  },
  FLOAT: {
    type: "FLOAT",
    notDeletable: true,
  },
  DOUBLE: {
    type: "DOUBLE",
    notDeletable: true,
  },
  OBJECT: {
    type: "OBJECT",
    notDeletable: true,
  },
  STRING: {
    type: "STRING",
    notDeletable: true,
  },
  BOOLEAN: {
    type: "BOOLEAN",
    notDeletable: true,
  },
  NULL: {
    type: "NULL",
    notDeletable: true,
  },
  ARRAY: {
    type: "ARRAY",
    notDeletable: true,
  },
  NUMERIC: {
    type: ["INTEGER", "LONG", "DOUBLE", "FLOAT"],
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
