import { Queue, deepEqual } from "../../src/util/deepEqual";

describe("deepEqual", () => {
  it("primitive", () => {
    expect(deepEqual(1, 1)).toBeTruthy();
    expect(deepEqual(1, 2)).toBeFalsy();
    expect(deepEqual("Save", "Save")).toBeTruthy();
    expect(deepEqual("Save", "Save1")).toBeFalsy();
    expect(deepEqual(1.0, 1)).toBeTruthy();
    expect(deepEqual(2, 2.0)).toBeTruthy();
    expect(deepEqual(13.123123, 13.123123)).toBeTruthy();
    expect(deepEqual(2.12, 2.123)).toBeFalsy();
  });
  it("array", () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(deepEqual([1, 2, 3], [1, 2])).toBeFalsy();
  });
  it("array in array", () => {
    expect(deepEqual([[1, 2], 3], [[1, 2], 3])).toBeTruthy();
    expect(deepEqual([[1, 2], 3, [4, 5]], [[1, 2], 3, [4, 5]])).toBeTruthy();
    expect(deepEqual([], [])).toBeTruthy();
    expect(
      deepEqual(
        [
          { a: 20, b: [30, 40] },
          { a: 120, b: [130, 140] },
        ],
        [
          { a: 20, b: [30, 40] },
          { a: 120, b: [130, 140] },
        ]
      )
    ).toBeTruthy();
  });
  it("object", () => {
    expect(deepEqual({}, {})).toBeTruthy();
    expect(deepEqual({ a: 2, b: [3, 4] }, { a: 2, b: [3, 4] })).toBeTruthy();
    expect(deepEqual({}, { a: 2 })).toBeFalsy();
  });
});

describe("Queue", () => {
  it("push and length", () => {
    let q1 = new Queue();
    expect(q1.length).toEqual(0);

    q1.push(10);
    expect(q1.list()).toEqual([10]);
    expect(q1.length).toEqual(1);

    q1.push(20);
    expect(q1.list()).toEqual([10, 20]);
    expect(q1.length).toEqual(2);

    q1.push(30);
    expect(q1.list()).toEqual([10, 20, 30]);
    expect(q1.length).toEqual(3);
  });

  it("deque and length", () => {
    let q1 = new Queue();

    q1.push(10);
    expect(q1.length).toEqual(1);

    q1.push(20);
    expect(q1.length).toEqual(2);
    expect(q1.deque()).toEqual(10);
    expect(q1.deque()).toEqual(20);
    expect(q1.length).toEqual(0);
  });

  it("list", () => {
    let q = new Queue();

    expect(q.list()).toEqual([]);
    q.push(10);
    expect(q.list()).toEqual([10]);
  });

  it("dispose", () => {
    let q1 = new Queue();

    q1.push(10);
    q1.push(20);
    q1.push(30);
    expect(q1.list()).toEqual([10, 20, 30]);
    q1.dispose();
    expect(q1.length).toEqual(0);
    expect(q1.head).toBeUndefined();
  });
});
