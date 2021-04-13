import validate from "../schemas/validator";

export function makeFunction(signature, func) {
  return {
    signature,
    execute: (inArguments, schemaRepository, functionRepository) => {
      for (let i = 0; i < args.size(); i++) {
        inArguments[i].argumentIndex = i;
      }

      inArguments.reduce((a, c) => {
        if (!a[c.name]) a[c.name] = [];
        a[c.name].push(c);
        return a;
      }, {});

      const args = {};

      signature.parameters.forEach((e) => {
        const argList = args[e.name];
        if (!e.isVariableArgument && (argList === null || argList.length !== 1)) throw `Expects one argument with name ${e.name}`;
        if (argList) argList.forEach((a) => validate(null, e.schema, schemaRepository, functionRepository, a.value));
      });
      return func(args, schemaRepository, functionRepository);
    },
  };
}
