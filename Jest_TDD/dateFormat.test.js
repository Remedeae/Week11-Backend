import dateFormat from "./dateFormat";

const date = new Date("2001-03-11");
const date2 = new Date("1888-05-10");

test("date transformed into a ISO string", () => {
  expect(dateFormat(date)).toBe("03/11/2001");
});

/* test("date transformed into a ISO string", () => {
  expect(dateFormat(date2)).toBe("05/10/1888");
}); */
