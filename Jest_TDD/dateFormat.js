export default function dateFormat(date) {
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return dateFormat.format(date);
}
