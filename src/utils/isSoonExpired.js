export const isSoonExpired = (date) => {
  const targetDate = new Date(date);
  const now = new Date();

  // 2 months in milliseconds (approx 60 days)
  const twoMonthsMs = 1000 * 60 * 60 * 24 * 60;

  return targetDate - now <= twoMonthsMs;
};
