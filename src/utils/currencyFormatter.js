export const formatCurrencyDZD = (amount) => {
  const lang = 'en';
  const locales = {
    ar: "ar-DZ",
    fr: "fr-FR",
    en: "en-US",
  };

  const locale = locales[lang] || "en-US";

  if (isNaN(amount) || amount === null || amount === undefined) {
    return lang === "ar" ? "غير محدد" : "Not selected";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "DZD",
    minimumFractionDigits: 2,
  }).format(amount);
};