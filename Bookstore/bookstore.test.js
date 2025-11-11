import {
  books,
  cart,
  transactionIds,
  searchBooks,
  addToChart,
  calculateTotal,
  processPayment,
  updateInventory,
  completePurchase,
} from "./bookstore.js";

beforeEach(() => {
  books.length = 0;
  books.push(
    {
      id: 1,
      title: "The Silent Grove",
      author: "Marion Clarke",
      price: 14.99,
      stock: 12,
    },
    {
      id: 2,
      title: "Stars Over Hollow Peak",
      author: "Darius Thorne",
      price: 18.5,
      stock: 7,
    },
    {
      id: 3,
      title: "Mechanics of Tomorrow",
      author: "Elena Ruiz",
      price: 22.0,
      stock: 4,
    },
    {
      id: 4,
      title: "Whispers in the Archive",
      author: "Jonah Patel",
      price: 12.75,
      stock: 20,
    },
    {
      id: 5,
      title: "Shadow of the Emberlands",
      author: "Kira Matsumoto",
      price: 16.4,
      stock: 9,
    }
  );
  cart.length = 0;
  transactionIds.length = 0;
});

test("See if searching for 'to' gives us the return of the book 'Mechanics of Tomorrow' and the autor 'Kira Matsumoto'", () => {
  expect(searchBooks("to")).toEqual([
    {
      id: 3,
      title: "Mechanics of Tomorrow",
      author: "Elena Ruiz",
      price: 22.0,
      stock: 4,
    },
    {
      id: 5,
      title: "Shadow of the Emberlands",
      author: "Kira Matsumoto",
      price: 16.4,
      stock: 9,
    },
  ]);
});

test("Test if adding book of ID 1 and quanitity 2 returns the book 'The Silent Grove' and quanitty of 2", () => {
  const cart = addToChart(1, 2);
  expect(cart[0]).toMatchObject({
    quantity: 2,
    book: { title: "The Silent Grove" },
  });
});

test("See if 3 of book ID 3 and 2 of book ID 2 will be over the summed price of 103, since 10% tax should be added", () => {
  const cart = () => {
    addToChart(2, 2);
    return addToChart(3, 3);
  };
  expect(parseInt(calculateTotal(cart()))).toBeGreaterThan(103);
});

test("Test that the payment outcome is a boolean and an id of type string is returned.", () => {
  expect(processPayment(777, 555)).toMatchObject({
    paymentOutcome: expect.any(Boolean),
    transactionId: expect.any(String),
  });
});

test("Check that en error is thrown if the order is larger the current stock of a book", () => {
  const bookId = 1;
  const stock = searchBooks(bookId.toString())[0].stock;
  const testCart = addToChart(bookId, 1000000);
  expect(() => updateInventory(testCart)).toThrow(
    "Not enough books in inventory for requested purchase"
  );
});

test("Check if storage is updated on successful checkout", () => {
  const bookId = 1;
  const quanitity = 2;
  const stock = searchBooks(bookId.toString())[0].stock;
  const stockUpdate = () => {
    completePurchase(5, bookId, quanitity, 1000000);
    const newStock = searchBooks(bookId.toString())[0].stock;
    return stock - newStock;
  };
  expect(stockUpdate()).toEqual(quanitity);
});
