import { SchemaType, path } from "./constants";

export default function numberValidator(type, parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!element || typeof element !== "number") throw `${path(parents, schema.title)}Expected a number found ${element}`;

  checkRange(type, parents, schema, element);
  checkMultipleOf(parents, schema, element);
}

function checkRange(type, parents, schema, element) {
  let msg = undefined;

  if (type === SchemaType.INTEGER || type === SchemaType.LONG) {
    let v = parseInt(element);
    if (v !== element) throw `${path(parents, schema.title)}Number ${element} is not of type ${type}`;
  }

  if (schema.minimum && schema.minimum > element) msg = ` should be greater than or equal to ${schema.minimum}`;
  if (schema.maximum && schema.maximum < element) msg = ` should be less than or equal to ${schema.maximum}`;
  if (schema.exclusiveMinimum && schema.exclusiveMinimum >= element) msg = ` should be greater than ${schema.exclusiveMinimum}`;
  if (schema.exclusiveMaximum && schema.exclusiveMaximum <= element) msg = ` should be less than ${schema.exclusiveMaximum}`;

  if (!msg) return;

  return `${path(parents, schema.title)}${element}${msg}`;
}

function checkMultipleOf(parents, schema, element) {
  if (!schema.multipleOf) return;

  let x = element % schema.multipleOf;
  if (x !== 0) throw `${path(parents, schema.title)}${element} is not a multiple of ${schema.multipleOf}`;
}
