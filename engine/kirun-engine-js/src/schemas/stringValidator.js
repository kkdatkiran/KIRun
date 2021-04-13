import { path } from "./constants";

const TIME = new RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?([+-][01][0-9]:[0-5][0-9])?$");

const DATE = new RegExp("^[0-9]{4,4}-([0][0-9]|[1][0-2])-(0[1-9]|[1-2][1-9]|3[01])$");

const DATETIME = new RegExp("^[0-9]{4,4}-([0][0-9]|[1][0-2])-(0[1-9]|[1-2][1-9]|3[01])T" + "([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?([+-][01][0-9]:[0-5][0-9])?$");

export default function stringValidator(parents, schema, schemaRepository, functionRepository, element, validate) {
  if (!element || typeof element !== "string") throw `${path(parents, schema.title)}Expected a string found ${element}`;

  if (schema.format === "TIME") {
    patternMatcher(parents, schema, element, TIME, "time pattern");
  } else if (schema.format === "DATE") {
    patternMatcher(parents, schema, element, DATE, "date pattern");
  } else if (schema.format === "DATETIME") {
    patternMatcher(parents, schema, element, DATETIME, "date time pattern");
  } else if (schema.pattern !== null) {
    patternMatcher(parents, schema, element, new RegExp(schema.pattern), "pattern " + schema.pattern);
  }

  if (schema.minLength && element.length < schema.minLength) {
    throw `${path(parents, schema.title)}Expected a minimum of ${schema.minLength} characters`;
  } else if (schema.maxLength && element.length > schema.maxLength) {
    throw `${path(parents, schema.title)}Expected a maximum of ${schema.maxLength} characters`;
  }
}

function patternMatcher(parents, schema, element, regex, message) {
  if (element.match(regex)) return;

  throw `${path(parents, schema.title)}${element} is not matched with the ${message}`;
}
