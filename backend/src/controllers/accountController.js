import { ethers } from "ethers";
import { getProvider } from "../config/blockchain.js";

/**
 * GET /api/accounts
 * Fetch first 10 Ganache accounts with their ETH balances.
 */
export const getAccounts = async (req, res, next) => {
  try {
    const provider = getProvider();
    const accounts = await provider.listAccounts();
    const first10 = accounts.slice(0, 10);

    const accountsWithBalances = await Promise.all(
      first10.map(async (signer) => {
        const address = await signer.getAddress();
        const balanceWei = await provider.getBalance(address);
        const balance = ethers.formatEther(balanceWei);
        return {
          address,
          balance: parseFloat(balance).toFixed(4),
          balanceRaw: balance,
        };
      })
    );

    res.json({
      success: true,
      count: accountsWithBalances.length,
      accounts: accountsWithBalances,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/accounts/:address/balance
 * Fetch single account balance.
 */
export const getAccountBalance = async (req, res, next) => {
  try {
    const { address } = req.params;

    if (!ethers.isAddress(address)) {
      return res.status(400).json({ success: false, error: "Invalid Ethereum address" });
    }

    const provider = getProvider();
    const balanceWei = await provider.getBalance(address);
    const balance = ethers.formatEther(balanceWei);

    res.json({
      success: true,
      address,
      balance: parseFloat(balance).toFixed(4),
    });
  } catch (err) {
    next(err);
  }
};
