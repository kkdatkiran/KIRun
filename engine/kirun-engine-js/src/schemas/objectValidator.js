import { path } from "./constants";

export default function objectValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!element || (typeof element !== "object" && !Array.isArray(element))) throw `${path(parents, schema.title)}Expected an object found ${element}`;

  const keys = new Set(Object.keys(element));

  checkMinMaxProperties(parents, schema, keys);

  if (schema.propertyNames) {
    checkPropertyNameSchema(parents, schema, schemaRepository, functionRepository, keys, validate);
  }

  if (schema.required) {
    checkRequired(parents, schema, jsonObject);
  }

  if (schema.properties) {
    keys = checkProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate);
  }

  if (schema.patternProperties) {
    keys = checkPatternProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate);
  }

  if (schema.additionalProperties) {
    checkAddtionalProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate);
  }

  if (schema.dependencies) {
    chekDependencies(parents, schema, jsonObject);
  }
}

function checkMinMaxProperties(parents, schema, keys) {
  if (schema.minProperties && keys.size < schema.minProperties) throw `${path(parents, schema.title)}Object should have minimum of ${schema.minProperties} properties.`;

  if (schema.maxProperties && keys.size > schema.maxProperties) throw `${path(parents, schema.title)}Object should have minimum of ${schema.maxProperties} properties.`;
}

function checkPropertyNameSchema(parents, schema, schemaRepository, functionRepository, keys, validate) {
  const list = [];
  for (let key of keys) {
    try {
      validate(parents, schema.propertyNames, schemaRepository, functionRepository, key);
    } catch (err) {
      list.push(err);
    }
  }

  if (list.length) throw list;
}

function checkRequired(parents, schema, jsonObject) {
  for (let key of schema.required) {
    if (!jsonObject[key]) throw `${path(parents, schema.title)}is mandatory.`;
  }
}

function chekDependencies(parents, schema, jsonObject) {
  let e = undefined;

  for (let dependency in schema.dependencies) {
    e = jsonObject[dependency];
    if (!e) continue;
    for (let k of schema.dependencies[dependency]) {
      if (!jsonObject[k]) throw `${path(parents, schema.title)}${dependency} requires ${k}`;
    }
  }
}

function checkAddtionalProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate) {
  if (typeof schema.additionalProperties.schemaValue === "object") {
    for (let key of keys) {
      let newParents = [...(parents ?? []), key];
      jsonObject[key] = validate(newParents, schema.additionalProperties, schemaRepository, functionRepository, jsonObject[key]);
    }
  } else if (typeof schema.additionalProperties.booleanValue === "boolean") {
    if (!schema.additionalProperties.booleanValue && keys.size === 0) throw `${path(parents, schema.title)}${Array.from(keys).join(", ")} are additonal properties which are not allowed.`;
  }
}

function checkPatternProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate) {
  let compiledPatterns = {};
  for (let keyPattern of schema.patternProperties) compiledPatterns[keyPattern] = new RegExp(keyPattern);

  let goodKeys = new Set();

  for (let key of keys) {
    let newParents = [...(parents ?? []), key];

    for (let [k, v] of Object.entries(compiledPatterns)) {
      if (key.match(v)) {
        jsonObject[key] = validate(newParents, schema.patternProperties[k], schemaRepository, functionRepository, jsonObject[key]);
        goodKeys.add(key);
        break;
      }
    }
  }

  return keys.filter((e) => goodKeys.has(e));
}

function checkProperties(parents, schema, schemaRepository, functionRepository, jsonObject, keys, validate) {
  let goodKeys = new Set();

  for (let [k, s] of Object.entries(schema.properties)) {
    let newParents = [...(parents ?? []), k];
    jsonObject[k] = validate(newParents, s, schemaRepository, functionRepository, jsonObject[k]);
    goodKeys.add(key);
  }

  return keys.filter((e) => goodKeys.has(e));
}
