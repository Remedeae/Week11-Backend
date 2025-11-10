import passwordValidation from "./passwordValid.js";

test("password is at least 8 characters and contains at least one number", () => {
  expect(passwordValidation("remedeae1")).toBe(true);
});
