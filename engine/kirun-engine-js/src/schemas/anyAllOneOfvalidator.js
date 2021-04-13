import { path } from "./constants";

export default function anyAllOneOfvalidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  let list = [];

  if (schema.oneOf?.length) oneOf(parents, schema, schemaRepository, functionRepository, element, list, validate);
  else if (schema.allOf?.length) allOf(parents, schema, schemaRepository, functionRepository, element, list, validate);
  else if (schema.anyOf?.length) anyOf(parents, schema, schemaRepository, functionRepository, element, list, validate);

  return element;
}

function anyOf(parents, schema, schemaRepository, functionRepository, element, list, validate) {
  let flag = false;
  for (let s of schema.anyOf) {
    try {
      validate(parents, s, schemaRepository, functionRepository, element);
      flag = true;
      break;
    } catch (err) {
      flag = false;
      list.add(err);
    }
  }

  if (!flag) {
    throw [`${path(parents, schema.title)}The value don't satisfy any of the schemas.`, ...list];
  }
}

function allOf(parents, schema, schemaRepository, functionRepository, element, list, validate) {
  let flag = 0;
  for (let s of schema.allOf) {
    try {
      validate(parents, s, schemaRepository, functionRepository, element);
      flag++;
    } catch (err) {
      list.add(err);
    }
  }

  if (flag !== schema.allOf.length) {
    throw [`${path(parents, schema.title)}The value doesn't satisfy some of the schemas.`, ...list];
  }
}

function oneOf(parents, schema, schemaRepository, functionRepository, element, list, validate) {
  let flag = 0;
  for (let s of schema.oneOf) {
    try {
      validate(parents, s, schemaRepository, functionRepository, element);
      flag++;
    } catch (err) {
      list.add(err);
    }
  }

  if (flag === 0) throw [`${path(parents, schema.title)}The value does not satisfy any schema.`, ...list];
  if (flag !== 1) throw [`${path(parents, schema.title)}The value satisfy more than one schema.`, ...list];
}
