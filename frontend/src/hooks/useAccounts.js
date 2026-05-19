import { useState, useCallback } from "react";
import { blockchainApi } from "../api/blockchainApi";
import toast from "react-hot-toast";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccounts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const data = await blockchainApi.getAccounts();
      setAccounts(data.accounts || []);
    } catch (err) {
      setError(err.message);
      if (!silent) toast.error(err.message || "Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update specific accounts' balances after a transfer.
   */
  const updateBalances = useCallback((fromAddress, toAddress, updatedBalances) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.address.toLowerCase() === fromAddress.toLowerCase()) {
          return { ...acc, balance: updatedBalances.from };
        }
        if (acc.address.toLowerCase() === toAddress.toLowerCase()) {
          return { ...acc, balance: updatedBalances.to };
        }
        return acc;
      })
    );
  }, []);

  return { accounts, loading, error, fetchAccounts, updateBalances };
};
