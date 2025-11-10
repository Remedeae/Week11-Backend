import stringCalc from "./stringCalc.js";

test("Adds numbers in a string", () => {
  expect(stringCalc("1,2,2")).toBe(5);
});
