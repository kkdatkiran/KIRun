import anyAllOneOfvalidator from "./anyAllOneOfvalidator";
import typeValidator from "./typeValidator";

export default function validate(parents, schema, schemaRepository, functionRepository, element) {
  if (typeof schema === "string") {
    if (!schemaRepository) throw `Unable to find the ${schema} as schema repository not supplied.`;
    schema = schemaRepository.find(schema);
  }

  if (!schema) return element;

  if (!element && schema.defaultValue) return schema.defaultValue;

  if (schema.constant) return schema.constant;

  if (schema.enums) {
    return enumCheck(parents, schema, schemaRepository, functionRepository, element, validate);
  }

  if (schema.type) {
    typeValidator(parents, schema, schemaRepository, functionRepository, element, validate);
  }

  if (schema.oneOf || schema.allOf || schema.anyOf) {
    anyAllOneOfvalidator(parents, schema, schemaRepository, functionRepository, element, validate);
  }

  if (schema.not) {
    let flag = false;
    try {
      validate(parents, schema.not, schemaRepository, functionRepository, element);
      flag = true;
    } catch (error) {
      flag = false;
    }
    if (flag) throw `${path(parents, schema.title)}Schema validated value in not condition.`;
  }

  return element;
}
