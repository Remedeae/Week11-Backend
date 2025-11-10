import arrayUniquer from "./arrayUniquer.js";

test("Check if there are duplicates in an array", () => {
  expect(arrayUniquer([1, 1, 2, 3, 3, 3, 2])).toEqual([1, 2, 3]);
});
