// Система оповіщення, яку ми розвиваємо на практичних заняттях: робота з датами.

// daysInMonth(month, year) повертає кількість днів у місяці month
// року year. month — ціле число від 1 до 12, year — рік нашої ери.
export function daysInMonth(month, year) {
  if (month === 2) {
    return 28;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return 31;
}
