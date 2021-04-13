import { path } from "./constants";

export default function nullValidator(parents, schema, element) {
  if (!element) return;

  throw `${path(parents, schema.title)}Expected a null value but found ${element}`;
}
