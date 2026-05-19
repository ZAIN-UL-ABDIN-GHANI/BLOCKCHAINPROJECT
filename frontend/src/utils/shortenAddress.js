/**
 * Shorten an Ethereum address for display.
 * @param {string} address - Full hex address
 * @param {number} chars - Characters to show at each end (default 6)
 */
export const shortenAddress = (address, chars = 6) => {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};
