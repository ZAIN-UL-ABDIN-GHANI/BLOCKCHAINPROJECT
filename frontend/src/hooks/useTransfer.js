import { useState, useCallback } from "react";
import { blockchainApi } from "../api/blockchainApi";
import toast from "react-hot-toast";

const initialForm = { from: "", to: "", amount: "" };
const initialErrors = { from: "", to: "", amount: "" };

const isValidEthAddress = (addr) => /^0x[0-9a-fA-F]{40}$/.test(addr);

export const useTransfer = (accounts, updateBalances) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);

  const validateForm = useCallback(() => {
    const newErrors = { from: "", to: "", amount: "" };
    let valid = true;

    // Validate FROM
    if (!form.from) {
      newErrors.from = "Please select or paste a sender address.";
      valid = false;
    } else if (!isValidEthAddress(form.from)) {
      newErrors.from = "Invalid Ethereum address (must be 0x + 40 hex characters).";
      valid = false;
    }

    // Validate TO
    if (!form.to) {
      newErrors.to = "Please select or paste a receiver address.";
      valid = false;
    } else if (!isValidEthAddress(form.to)) {
      newErrors.to = "Invalid Ethereum address (must be 0x + 40 hex characters).";
      valid = false;
    }

    // Same address check
    if (form.from && form.to && form.from.toLowerCase() === form.to.toLowerCase()) {
      newErrors.to = "Sender and receiver must be different accounts.";
      valid = false;
    }

    // Amount validation
    if (!form.amount || parseFloat(form.amount) <= 0) {
      newErrors.amount = "Enter a valid positive amount.";
      valid = false;
    } else {
      const sender = accounts.find(
        (a) => a.address.toLowerCase() === form.from.toLowerCase()
      );
      if (sender && parseFloat(form.amount) >= parseFloat(sender.balance)) {
        newErrors.amount = `Insufficient balance. Available: ${parseFloat(sender.balance).toFixed(4)} ETH`;
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  }, [form, accounts]);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    const toastId = toast.loading("Processing transaction…");

    try {
      const data = await blockchainApi.transfer(form.from, form.to, form.amount);
      setLastTx(data.transaction);
      updateBalances(form.from, form.to, data.updatedBalances);
      toast.success(`Sent ${form.amount} ETH successfully!`, { id: toastId });
      setForm(initialForm);
    } catch (err) {
      toast.error(err.message || "Transfer failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  }, [form, validateForm, updateBalances]);

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors(initialErrors);
    setLastTx(null);
  }, []);

  return { form, errors, loading, lastTx, handleChange, handleSubmit, resetForm };
};
