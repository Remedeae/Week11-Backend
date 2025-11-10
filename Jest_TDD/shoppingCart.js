export default function total(cart) {
  try {
    if (!Array.isArray(cart)) {
      throw new Error("Invalid data input: expected array");
    }
    if (cart.length === 0) {
      return 0;
    }
    const total = cart.reduce((sum, s) => {
      if (!s.price || !s.quantity) {
        throw new Error(
          "Invalid data input: expecting price and quantity for each object"
        );
      }
      return sum + s.price * s.quantity;
    }, 0);
    return total;
  } catch (error) {
    return error;
  }
}
