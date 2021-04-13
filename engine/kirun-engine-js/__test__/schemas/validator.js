import validator from "../../src/schemas/validator";

describe("validator", () => {
  it("Integer", () => {
    expect(validator(undefined, {}, undefined, undefined, 20)).toEqual(20);
    expect(() => validator(undefined, { type: "STRING" }, undefined, undefined, 20)).toThrow(new Error(["Value '20' is not of valid type(s)", "Expected a string found 20"]));
    expect(validator(undefined, { type: ["INTEGER", "FLOAT"] }, undefined, undefined, 20)).toEqual(20);
    expect(validator(undefined, { type: ["INTEGER", "NULL"] }, undefined, undefined, undefined)).toBeFalsy();
    expect(validator(undefined, { type: ["INTEGER", "NULL"] }, undefined, undefined, 30)).toEqual(30);
    expect(() => validator(undefined, { type: ["INTEGER", "NULL"] }, undefined, undefined, 30.3)).toThrow(
      new Error(["Value '30.3' is not of valid type(s)", "Number 30.3 is not of type INTEGER", "Expected a null value but found 30.3"])
    );
  });

  it("Array", () => {
    expect(validator(undefined, { items: { singleSchema: { type: "INTEGER" } } }, undefined, undefined, [10, 20])).toEqual([10, 20]);
    expect(() => validator(undefined, { type: ["ARRAY"], items: { singleSchema: { type: "INTEGER" } }, minItems: 2 }, undefined, undefined, [10, 20.2])).toThrow(
      new Error(["Value '10,20.2' is not of valid type(s)", "Value '20.2' is not of valid type(s)", "Number 20.2 is not of type INTEGER"])
    );
  });
});
