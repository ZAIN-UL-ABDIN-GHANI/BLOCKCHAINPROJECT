import { ethers } from "ethers";
import { getProvider, getSigner } from "../config/blockchain.js";

/**
 * POST /api/transfer
 * Transfer ETH from sender to receiver.
 * Body: { from, to, amount }
 */
export const transferEther = async (req, res, next) => {
  try {
    const { from, to, amount } = req.body;

    // Validate addresses
    if (!ethers.isAddress(from) || !ethers.isAddress(to)) {
      return res.status(400).json({ success: false, error: "Invalid Ethereum address provided." });
    }

    // Prevent same-account transfer
    if (from.toLowerCase() === to.toLowerCase()) {
      return res.status(400).json({ success: false, error: "Sender and receiver must be different accounts." });
    }

    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ success: false, error: "Amount must be a positive number." });
    }

    const provider = getProvider();

    // Check sender balance
    const balanceWei = await provider.getBalance(from);
    const balanceEth = parseFloat(ethers.formatEther(balanceWei));

    if (amountNum >= balanceEth) {
      return res.status(400).json({
        success: false,
        error: `Insufficient funds. Available: ${balanceEth.toFixed(4)} ETH`,
      });
    }

    // Get signer and send transaction
    const signer = await getSigner(from);
    const valueWei = ethers.parseEther(amount.toString());

    const tx = await signer.sendTransaction({ to, value: valueWei });
    const receipt = await tx.wait();

    // Fetch updated balances
    const [newFromBalance, newToBalance] = await Promise.all([
      provider.getBalance(from),
      provider.getBalance(to),
    ]);

    res.json({
      success: true,
      message: "Transfer successful",
      transaction: {
        hash: receipt.hash,
        from: receipt.from,
        to: receipt.to,
        amount: amount.toString(),
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status === 1 ? "confirmed" : "failed",
      },
      updatedBalances: {
        from: parseFloat(ethers.formatEther(newFromBalance)).toFixed(4),
        to: parseFloat(ethers.formatEther(newToBalance)).toFixed(4),
      },
    });
  } catch (err) {
    // Handle known ethers errors
    if (err.code === "INSUFFICIENT_FUNDS") {
      return res.status(400).json({ success: false, error: "Insufficient funds for gas + value." });
    }
    if (err.code === "INVALID_ARGUMENT") {
      return res.status(400).json({ success: false, error: "Invalid transaction argument." });
    }
    next(err);
  }
};
