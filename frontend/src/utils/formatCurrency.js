/**
 * Format ETH balance for display with symbol.
 */
export const formatETH = (value, decimals = 4) => {
  const n = parseFloat(value);
  if (isNaN(n)) return "0.0000 ETH";
  return `${n.toFixed(decimals)} ETH`;
};

/**
 * Sum all balances from accounts array.
 */
export const sumBalances = (accounts) => {
  return accounts.reduce((sum, acc) => sum + parseFloat(acc.balance || 0), 0);
};
