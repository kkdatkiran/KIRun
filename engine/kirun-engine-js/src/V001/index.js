import schemaRepository from "../schemas";
import functionRepository from "../functions";
import statements from "./statements";

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
    start.forEach(([e]) => addMessage(msgs, e, "Multiple starts found, only one is allowed."));
    return;
  }
  if (!start[0].properties?.parameters?.length) return;

  for (let param of start[0].properties.parameters)
    if (!repository.findSchema(param.schema)) {
      addMessage(msgs, start[0][0], `Unkown schema '${param.schema}' is used for the parameter ${param.name}.`);
    }
}

function compile({ code, functions = functionRepository, repository = schemaRepository }) {
  if (!code?.definition?.steps) return undefined;

  let steps = Object.entries(code.definition.steps);
  const msgs = {};
  startStepCheck(steps, msgs, repository);

  return msgs;
}

function debug() {}
function execute() {}

module.exports = {
  statements,
  compile,
  debug,
  execute,
};
