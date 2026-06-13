export const normalizePriceRange = (value = "") =>
  value
    .replaceAll("ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹", "₹")
    .replaceAll("Ã¢â€šÂ¹", "₹")
    .replaceAll("â‚¹", "₹")
    .replace(/\s+/g, " ")
    .trim();

export const getStartingPrice = (priceRange = "") => {
  const firstMatch = normalizePriceRange(priceRange).match(/₹?\s?(\d[\d,]*)/);
  return firstMatch ? `₹${firstMatch[1]}` : "Custom";
};

export const getPriceBadge = (priceRange = "") => {
  const values = normalizePriceRange(priceRange).match(/\d[\d,]*/g) || [];
  if (!values.length) return "Custom quote";
  if (values.length === 1) return `From ₹${values[0]}`;
  return `₹${values[0]} - ₹${values[values.length - 1]}`;
};
