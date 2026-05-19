import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const RPC_URL = process.env.GANACHE_RPC_URL || "http://127.0.0.1:7545";

let provider = null;

/**
 * Initialize and return the JsonRpc provider connected to Ganache.
 * Singleton pattern — reuses existing connection.
 */
export const getProvider = () => {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(RPC_URL);
  }
  return provider;
};

/**
 * Return a signer for a given address using the provider.
 * Ganache unlocks all accounts automatically.
 */
export const getSigner = (address) => {
  const p = getProvider();
  return p.getSigner(address);
};

/**
 * Verify the connection to the blockchain.
 */
export const verifyConnection = async () => {
  try {
    const p = getProvider();
    const network = await p.getNetwork();
    console.log(`✅ Connected to blockchain — chainId: ${network.chainId}`);
    return true;
  } catch (err) {
    console.error("❌ Blockchain connection failed:", err.message);
    return false;
  }
};
