import { path } from "./constants";

export default function booleanValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!element) throw `${path(parents, schema.title)}Expected a boolean but found null`;

  if (typeof element !== "boolean") throw `${path(parents, schema.title)}${element} is not a boolean`;
}
