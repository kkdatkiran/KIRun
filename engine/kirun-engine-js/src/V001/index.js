import schemaRepository from "../schemas";
import functionRepository from "../functions";

const STATEMENTS = {
  ASSERT: { in: 1, out: 1, dependency: {} },
  BREAK: {
    in: 1,
    out: 0,
    dependency: { parent: ["LOOP", " WHILESTART", " WHILEEND"] },
  },
  CATCH: {
    in: 1,
    out: 1,
    hasChildren: true,
    dependency: { predecessor: ["TRY"] },
  },
  CASE: {
    in: 1,
    out: 0,
    hasChildren: true,
    dependency: { parent: ["SWITCH"] },
  },
  CONTINUE: {
    in: 1,
    out: 0,
    dependency: { parent: ["LOOP", " WHILESTART", " WHILEEND"] },
  },
  END: { in: 1, out: 0, dependency: {} },
  ELSE: {
    in: 1,
    out: 0,
    hasChildren: true,
    dependency: { parent: ["IF", " ELSEIF"] },
  },
  ELSEIF: {
    in: 1,
    out: 1,
    hasChildren: true,
    childrenAllowed: ["THEN", " ELSE", " ELSEIF"],
    dependency: { parent: ["IF"], children: ["ELSE", "ELSEIF"] },
  },
  EXPRESSION: { in: 1, out: 1, dependency: {} },
  FINALLY: {
    in: 1,
    out: 1,
    hasChildren: true,
    dependency: { predecessor: ["TRY", " CATCH"] },
  },
  FUNCTION: { in: 0, out: 1, hasChildren: true, dependency: {} },
  IF: {
    in: 1,
    out: 1,
    hasChildren: true,
    childrenAllowed: ["THEN", " ELSE", " ELSEIF"],
    dependency: { children: ["ELSE", "ELSEIF"] },
  },
  LOOP: { in: 1, out: 1, hasChildren: true, dependency: {} },
  START: { in: 0, out: 1, dependency: {} },
  SWITCH: {
    in: 1,
    out: 1,
    hasChildren: true,
    childrenAllowed: ["CASE"],
    dependency: {},
  },
  THEN: { in: 1, out: 0, hasChildren: true, dependency: {} },
  THROW: { in: 1, out: 1, dependency: {} },
  TRY: { in: 1, out: 1, hasChildren: true, dependency: {} },
  WHILESTART: { in: 1, out: 1, hasChildren: true, dependency: {} },
  WHILEEND: { in: 1, out: 1, hasChildren: true, dependency: {} },
};

const GENERAL = "general";

function addMessage(msgs, key, message) {
  if (!msgs[key]) msgs[key] = [];
  msgs[key].push(message);
}

function startStepCheck(steps, msgs, repository) {
  const start = steps.filter(([, e]) => e.type === "START");
  if (start.length === 0) {
    addMessage(msgs, GENERAL, "No start is found.");
    return;
  } else if (start.length > 1) {
    start.forEach(([e]) =>
      addMessage(msgs, e, "Multiple starts found, only one is allowed.")
    );
    return;
  }
  if (!start[0].properties?.parameters?.length) return;

  for (let param of start[0].properties.parameters)
    if (!repository.findSchema(param.schema)) {
      addMessage(
        msgs,
        start[0][0],
        `Unkown schema '${param.schema}' is used for the parameter ${param.name}.`
      );
    }
}

function compile({
  code,
  functions = functionRepository,
  repository = schemaRepository,
}) {
  if (!code?.definition?.steps) return undefined;

  let steps = Object.entries(code.definition.steps);
  const msgs = {};
  startStepCheck(steps, msgs, repository);

  return msgs;
}

function debug() {}
function execute() {}

module.exports = {
  statements: STATEMENTS,
  compile,
  debug,
  execute,
};
