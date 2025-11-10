export default function passwordValidation(password) {
  if (password.length < 8) {
    return "Password to short";
  }
  if (!/\d/.test(password)) {
    return "Password must contain a number";
  }
  return true;
}
