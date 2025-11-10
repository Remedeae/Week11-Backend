export default function arrayUniquer(array) {
  try {
    if (!Array.isArray(array)) {
      throw new Error("Input must be of type array");
    }
    const unique = [...new Set(array)];
    return unique;
  } catch (error) {
    return error;
  }
}
