import repo from "../../schemas";
import { makeFunction } from "../util";

const NUMERIC = repo.find("NUMERIC");

const Abs = makeFunction(
  {
    name: "Abs",
    parameters: [{ name: "value", schema: NUMERIC }],
    returns: { schema: NUMERIC },
  },
  (args) => {
    return { value: Math.abs(args.value[0].value) };
  }
);

export default Abs;
