export default function stringCalc(string) {
  try {
    if (typeof string !== "string") {
      throw new Error("Input must be a string");
    }
    if (string === "") {
      return 0;
    }
    const numberArray = string.split(",");
    const sum = numberArray.reduce((sum, n) => {
      const number = parseInt(n);
      if (Number.isNaN(number)) {
        throw new Error(
          "The string can only contain numbers split up by commas"
        );
      }
      return sum + number;
    }, 0);
    return sum;
  } catch (error) {
    return error;
  }
}
