export const SchemaType = {
  STRING: "STRING",
  INTEGER: "INTEGER",
  LONG: "LONG",
  FLOAT: "FLOAT",
  DOUBLE: "DOUBLE",
  OBJECT: "OBJECT",
  ARRAY: "ARRAY",
  BOOLEAN: "BOOLEAN",
  NULL: "NULL",
};

export function path(parents, title) {
  let prefix = (parents ?? []).join("/");
  if (prefix) prefix += "/";
  if (title) return `${prefix}${title} `;
  return "";
}
