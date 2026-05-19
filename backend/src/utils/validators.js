import { ethers } from "ethers";

export const isValidAddress = (address) => ethers.isAddress(address);

export const isPositiveNumber = (value) => {
  const n = parseFloat(value);
  return !isNaN(n) && n > 0;
};

export const isDifferentAddress = (a, b) =>
  a.toLowerCase() !== b.toLowerCase();
