/**
 * Format a raw ETH balance string to a fixed decimal display.
 * @param {string} balance - ETH balance as string
 * @param {number} decimals - Decimal places (default 4)
 */
export const formatBalance = (balance, decimals = 4) => {
  const num = parseFloat(balance);
  if (isNaN(num)) return "0.0000";
  return num.toFixed(decimals);
};
