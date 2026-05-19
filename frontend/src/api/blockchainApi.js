import axios from "axios";

// Centralized Axios instance
const api = axios.create({
  baseURL: "/api",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export const blockchainApi = {
  /** Fetch health status of the API */
  getHealth: () => api.get("/health"),

  /** Fetch first 10 Ganache accounts with balances */
  getAccounts: () => api.get("/accounts"),

  /**
   * Transfer ETH between accounts
   * @param {string} from - Sender address
   * @param {string} to - Receiver address
   * @param {string|number} amount - ETH amount
   */
  transfer: (from, to, amount) =>
    api.post("/transfer", { from, to, amount: amount.toString() }),
};

export default blockchainApi;
