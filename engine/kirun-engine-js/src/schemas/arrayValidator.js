import { deepEqual } from "../util/deepEqual";
import { path } from "./constants";

export default function arrayValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!Array.isArray(element)) throw `${path(parents, schema.title)}${JSON.stringify(element)} is not an Array`;

  checkMinMaxItems(parents, schema, element);
  checkItems(parents, schema, schemaRepository, functionRepository, element, validate);
  checkUniqueItems(parents, schema, element);
  checkContains(parents, schema, schemaRepository, functionRepository, element, validate);
}

function checkContains(parents, schema, schemaRepository, functionRepository, array, validate) {
  if (!schema.contains) return;

  let flag = false;
  for (let i = 0; i < array.length; i++) {
    const newParents = [...(parents ?? [])];
    newParents.push("" + i);
    try {
      validate(newParents, schema.contains, schemaRepository, functionRepository, array[i]);
      flag = true;
      break;
    } catch (err) {
      flag = false;
    }
  }

  if (!flag) throw `${path(parents, schema.title)}None of the items are of type contains schema`;
}

function checkUniqueItems(parents, schema, array) {
  if (!schema.uniqueItems) return;

  for (let i = 0; i < array.length; i++) for (let j = i + 1; j < array.length; j++) if (deepEqual(array[i], array[j])) throw `${path(parents, schema.title)}Items on the array are not unique`;
}

function checkMinMaxItems(parents, schema, array) {
  if (schema.minItems && schema.minItems > array.length) throw `${path(parents, schema.title)}Array should have minimum of ${schema.minItems} elements`;

  if (schema.maxItems && schema.maxItems < array.length) throw `${path(parents, schema.title)}Array can have maximum of ${schema.maxItems} elements`;
}

function checkItems(parents, schema, schemaRepository, functionRepository, array, validate) {
  if (!schema.items) return;
  if (schema.items.singleSchema) {
    for (let i = 0; i < array.length; i++) {
      let newParents = [...(parents ?? []), "" + i];
      array[i] = validate(newParents, schema.items.singleSchema, schemaRepository, functionRepository, array[i]);
    }
  }

  if (schema.items.tupleSchema) {
    if (schema.items.tupleSchema.length !== array.length) throw `${path(parents, schema.title)}Expected an array with only ${schema.items.tupleSchema.length} but found ${array.length}`;

    for (let i = 0; i < array.length; i++) {
      let newParents = [...(parents ?? []), "" + i];
      array[i] = validate(newParents, schema.items.tupleSchema[i], schemaRepository, functionRepository, array);
    }
  }
}
