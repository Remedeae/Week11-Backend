import total from "./shoppingCart.js";

test("sum total price of items in shopping cart", () => {
  expect(
    total([
      { price: 5, quantity: 2 },
      { price: 10, quantity: 1 },
    ])
  ).toBe(20);
});
