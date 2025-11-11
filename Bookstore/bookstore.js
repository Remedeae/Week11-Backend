let books = [
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
  },
];
let cart = [];
let transactionIds = [];

const searchBooks = (query) => {
  const q = query.toString().toLowerCase();
  const search = books.filter(
    (s) =>
      s.id.toString() === q ||
      s.title.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q)
  );
  return search;
};
//console.log(searchBooks(5));

const addToChart = (bookId, quantity) => {
  const book = searchBooks(bookId)[0];
  cart.push({ book, quantity });
  return cart;
};
//addToChart(1, 2);
//addToChart(2, 2);
//addToChart(3, 1);
//console.log(cart);

const calculateTotal = (cart) => {
  const total = cart
    .reduce((sum, s) => {
      return sum + s.book.price * s.quantity * 1.1;
    }, 0)
    .toFixed(2);
  return total;
};
//console.log(calculateTotal(cart));

const generateTransactionId = () => Math.floor(Math.random() * 10000);
const duplicateIdCheck = (id) => !transactionIds.includes(id);

const processPayment = (cartTotal, paymentMethod) => {
  const payRandom = Math.random() * 3;
  const paymentOutcome =
    payRandom < 1 || paymentMethod < cartTotal ? false : true;
  let id;
  do {
    id = generateTransactionId();
  } while (!duplicateIdCheck(id));
  transactionIds.push(id);
  return { paymentOutcome, transactionId: id.toString() };
};

//console.log(processPayment(calculateTotal(cart), 3));

const updateInventory = (cart) => {
  books.forEach((i) => {
    const cartItem = cart.find((c) => c.book.id === i.id);
    if (cartItem) {
      const updatedStock = i.stock - cartItem.quantity;
      if (updatedStock < 0) {
        throw new Error("Not enough books in inventory for requested purchase");
      }
      i.stock = updatedStock;
    }
  });
  return books;
};
//console.log(updateInventory(cart));

const completePurchase = (searchQuery, bookId, quantity, paymentMethod) => {
  try {
    searchBooks(searchQuery);
    const cart = addToChart(bookId, quantity);
    const total = calculateTotal(cart);
    const paymentSuccess = processPayment(total, paymentMethod);
    if (!paymentSuccess.paymentOutcome) {
      throw new Error(
        "Transaction was not completed. Please try again or change payment method."
      );
    }
    updateInventory(cart);
    return {
      message: "Transaction completed, order in progress",
      transactionID: paymentSuccess.transactionId,
      cart,
    };
  } catch (error) {
    console.error(error);
  }
};
//console.dir(completePurchase(5, 1, 66, 10000000), { depth: null });

export {
  books,
  cart,
  transactionIds,
  searchBooks,
  addToChart,
  calculateTotal,
  processPayment,
  updateInventory,
  completePurchase,
};
