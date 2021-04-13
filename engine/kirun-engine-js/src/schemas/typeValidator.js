import { SchemaType, path } from "./constants";
import arrayValidator from "./arrayValidator";
import booleanValidator from "./booleanValidator";
import nullValidator from "./nullValidator";
import objectValidator from "./objectValidator";
import stringValidator from "./stringValidator";
import numberValidator from "./numberValidator";

export default function typeValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  let valid = false;
  let list = [];

  let types = Array.isArray(schema.type) ? schema.type : [schema.type];

  for (let type of types) {
    try {
      typeValidation(parents, type, schema, schemaRepository, functionRepository, element, validate);
      valid = true;
      break;
    } catch (err) {
      valid = false;
      if (Array.isArray(err)) list = [...list, ...err];
      else list.push(err);
    }
  }

  if (!valid) throw [`${path(parents, schema.title)}Value '${element}' is not of valid type(s)`, ...list];
}

function typeValidation(parents, type, schema, schemaRepository, functionRepository, element, validate) {
  if (type === SchemaType.STRING) {
    stringValidator(parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === SchemaType.LONG || type === SchemaType.INTEGER || type === SchemaType.DOUBLE || type === SchemaType.FLOAT) {
    numberValidator(type, parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === SchemaType.BOOLEAN) {
    booleanValidator(parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === SchemaType.OBJECT) {
    objectValidator(parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === SchemaType.ARRAY) {
    arrayValidator(parents, schema, schemaRepository, functionRepository, element, validate);
  } else if (type === SchemaType.NULL) {
    nullValidator(parents, schema, element);
  } else {
    throw `${path(parents, schema.title)}${type} is not a valid type.`;
  }
}
