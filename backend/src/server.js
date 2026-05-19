import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { verifyConnection } from "./config/blockchain.js";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  const connected = await verifyConnection();

  if (!connected) {
    console.warn("⚠️  Could not connect to Ganache. Ensure Ganache is running on port 7545.");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 Blockchain RPC: ${process.env.GANACHE_RPC_URL}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();
